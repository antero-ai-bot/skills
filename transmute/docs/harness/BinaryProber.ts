import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * ISO8583 BEHAVIORAL PROBER
 * Purpose: Capture exactly how the C engine packs binary financial messages.
 */
function probeIsoEngine() {
  console.log("🔍 [Prober] Executing probe on Oscar ISO8583 C Engine...");
  
  const scenarios = [
    { mti: "0200", fields: { "0": "0200", "2": "1234567890123456", "3": "000000" }, desc: "Standard Purchase" },
    { mti: "0800", fields: { "0": "0800", "70": "301" }, desc: "Network Management" },
    { mti: "0100", fields: { "0": "0100", "4": "1000", "11": "123" }, desc: "Authorization" },
    { mti: "0200", fields: { "0": "0200", "7": "1231235959" }, desc: "Date Time Field (Fixed)" },
    { mti: "0200", fields: { "0": "0200", "32": "123456" }, desc: "LLVAR Field (Acquirer)" },
    { mti: "0200", fields: { "0": "0200", "43": "My Merchant Name             City  US" }, desc: "Alphanumeric Fixed (Merchant)" },
    { mti: "0200", fields: { "0": "0200", "40": "123" }, desc: "Field 40 (ANS Fixed)" },
    { mti: "0200", fields: { "0": "0200", "48": "Some additional data with special chars!@#" }, desc: "LLLVAR Field (Additional Data)" },
    { mti: "0200", fields: { "0": "0200", "5": "000000010000" }, desc: "Field 5 - Amount, Settlement (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "6": "000000020000" }, desc: "Field 6 - Amount, Cardholder Billing (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "14": "1225" }, desc: "Field 14 - Date, Expiration (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "15": "012515" }, desc: "Field 15 - Date, Settlement (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "16": "1234" }, desc: "Field 16 - Date, Conversion (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "17": "1234" }, desc: "Field 17 - Date, Capture (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "18": "5411" }, desc: "Field 18 - Merchant Type (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "20": "840" }, desc: "Field 20 - Country Code, PAN (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "24": "123" }, desc: "Field 24 - NII (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "8": "12345678" }, desc: "Field 8 - Amount, Cardholder Billing Fee (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "9": "87654321" }, desc: "Field 9 - Conversion Rate, Settlement (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "10": "12345678" }, desc: "Field 10 - Conversion Rate, Cardholder Billing (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "21": "123" }, desc: "Field 21 - Country Code, Forwarding Inst (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "22": "123" }, desc: "Field 22 - POS Entry Mode (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "23": "123" }, desc: "Field 23 - Application PAN (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "25": "12" }, desc: "Field 25 - POS Condition Code (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "27": "1" }, desc: "Field 27 - Auth ID Resp Len (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "28": "C00000123" }, desc: "Field 28 - Amount, Txn Fee (Fixed XN)" },
    // New fields from ISO8583-1993 spec expansion
    { mti: "0200", fields: { "0": "0200", "13": "0216" }, desc: "Field 13 - Date, Effective (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "19": "246" }, desc: "Field 19 - Country Code, Acquirer (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "26": "1234" }, desc: "Field 26 - Card Acceptor Business Code (Fixed N)" },
    { mti: "0200", fields: { "0": "0200", "49": "USD" }, desc: "Field 49 - Currency Code, Txn (Fixed AN)" }
  ];

  const dataset = scenarios.map(s => {
    // Use 1993 version for 1993-specific fields
    const has1993Field = ["7","13","19","26","32","43","48","49"].some(f => s.fields[f] !== undefined);
    const version = has1993Field ? "1993" : "1987";
    let args = `--version ${version} `;
    Object.entries(s.fields).forEach(([id, val]) => {
      args += `${id} "${val}" `;
    });

    try {
      const output = execSync(`./harness/bin/iso_probe ${args}`, { cwd: '.' }).toString().trim();
      return {
        input: s,
        output_hex: output,
        description: s.desc,
        version: version
      };
    } catch (e: any) {
      return { input: s, error: e.message, version: version };
    }
  });

  fs.writeFileSync('contracts/GOLD_STANDARD.json', JSON.stringify(dataset, null, 2));
  console.log("✅ Gold Standard captured from real binary.");
}

probeIsoEngine();
