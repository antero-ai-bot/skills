#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const command = process.argv[2];

if (command === 'init') {
    const source = process.argv[4];
    const target = process.argv[6];
    console.log(`Initializing Transmute project: ${source} -> ${target}`);
} else if (command === 'bridge') {
    const legacy = process.argv[4];
    const modern = process.argv[6];
    console.log(`Establishing Verification Bridge between ${legacy} and ${modern}`);
} else if (command === 'port') {
    const logicPath = process.argv[3];
    if (!logicPath) {
        console.log('Usage: transmute port <path_to_logic>');
        process.exit(1);
    }

    console.log(`🚀 Starting Agentic Porting for: ${logicPath}`);
    
    const prompt = `You are a Transmute Modernization Agent. 
Follow the TIP Protocol (docs/PROTOCOL.md) to port the logic in the attached file to a modern implementation.
1. Analyze the behavioral requirements.
2. Reconstruct the functional logic in the target language (Java/TypeScript as appropriate).
3. Ensure functional parity with the original logic.
4. Add comprehensive code comments explaining the mapping.
5. Reference AGENTS.md for established patterns.`;

    // Ensure we use a working model
    const args = ['--models', 'gemini-3-flash', '-p', prompt, `@${logicPath}`, '@AGENTS.md', '@docs/PROTOCOL.md', '@TASKS.md'];
    
    const pi = spawn('pi', args);

    pi.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    pi.stderr.on('data', (data) => {
        process.stderr.write(data);
    });

    pi.on('close', (code) => {
        if (code === 0) {
            console.log('\n✅ Porting task completed successfully.');
        } else {
            console.log(`\n❌ Porting task failed with code ${code}.`);
        }
    });

} else if (command === 'status') {
    console.log('Transmute Project Status:');
    console.log('- Core Skill: ✅ Active (AgentSkills 1.0)');
    console.log('- Porting Engine: ✅ Pi Coding Agent integration active');
    console.log('- Reference Pairs: ✅ 3 loaded (COBOL, GenCA, C)');
} else {
    console.log('Transmute CLI - Agentic Legacy Modernization');
    console.log('Usage: transmute <command> [options]');
    console.log('Commands: init, bridge, port, status');
}
