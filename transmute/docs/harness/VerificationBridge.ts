import { execFileSync } from 'child_process';
import { Decimal } from 'decimal.js';
import { CustomerService } from '../target/CustomerService.ts';

/**
 * Verification Bridge for CA Gen Customer Services.
 */
export class VerificationBridge {
  constructor(private modernService: CustomerService) {}

  async callLegacy(input: { command: string, args: any[] }): Promise<any> {
    const cliArgs = ['harness/legacy_bin.js', input.command, ...input.args.map((a) => a.toString())];
    const output = execFileSync('node', cliArgs).toString();
    const res = JSON.parse(output);
    if (res.customer_balance) res.customer_balance = new Decimal(res.customer_balance);
    if (res.discount_rate) res.discount_rate = new Decimal(res.discount_rate);
    if (res.discount_amount) res.discount_amount = new Decimal(res.discount_amount);
    if (res.total_balance) res.total_balance = new Decimal(res.total_balance);
    if (res.final_amount) res.final_amount = new Decimal(res.final_amount);
    if (res.order_total) res.order_total = new Decimal(res.order_total);
    if (res.new_total) res.new_total = new Decimal(res.new_total);
    if (res.total_ordered_amount) res.total_ordered_amount = new Decimal(res.total_ordered_amount);
    if (res.gross_amount) res.gross_amount = new Decimal(res.gross_amount);
    if (res.discount_amount) res.discount_amount = new Decimal(res.discount_amount);
    if (res.total_discount) res.total_discount = new Decimal(res.total_discount);
    if (res.net_amount) res.net_amount = new Decimal(res.net_amount);
    if (res.final_discount) res.final_discount = new Decimal(res.final_discount);
    if (res.max_discount) res.max_discount = new Decimal(res.max_discount);
    return res;
  }

  async callModern(input: { command: string, args: any[] }): Promise<any> {
    try {
      const { command, args } = input;
      switch (command) {
        case 'GET_DETAILS': {
          return this.modernService.getCustomerDetailsActionBlock(args[0]);
        }
        case 'UPDATE_STATUS': {
          const status = await this.modernService.updateCustomerStatus(args[0], args[1]);
          return { updated_status: status };
        }
        case 'UPDATE_PROFILE': {
          return this.modernService.updateCustomerProfile(args[0], args[1]);
        }
        case 'CALC_DISCOUNT':
        case 'CALCULATE_DISCOUNT': {
          const d = await this.modernService.calculateLoyaltyDiscount(args[0], args[1]);
          return { discount_rate: d.rate, discount_amount: d.amount };
        }
        case 'GET_SUMMARY': {
          const s = await this.modernService.getAccountSummary(args[0]);
          return { account_count: s.count, total_balance: s.total };
        }
        case 'BATCH_GET': {
          const ids = args[0].toString().split(',');
          return this.modernService.getCustomersBatch(ids);
        }
        case 'CREATE_CUSTOMER': {
          const id = await this.modernService.createCustomer(args[0], args[1], args[2]);
          return { customer_id: id };
        }
        case 'PROCESS_NEW': {
          const id = await this.modernService.processNewCustomer(args[0]);
          return { customer_id: id };
        }
        case 'AUDIT_HEADER': {
          const header = await this.modernService.getAuditHeader(args[0], args[1]);
          return { header };
        }
        case 'CREATE_ORDER': {
          const order_id = await this.modernService.createOrder(args[0], args[1]);
          return { order_id };
        }
        case 'PROCESS_PAYMENT': {
          const r = await this.modernService.processOrderPayment(args[0], args[1]);
          return { order_id: r.orderId, final_amount: r.finalAmount };
        }
        case 'PROCESS_PAYMENT_GEN': {
          return this.modernService.processOrderPaymentActionBlock(args[0], args[1]);
        }
        case 'GET_ORDER': {
          const d = await this.modernService.getOrderDetails(args[0]);
          return { order_total: d.total, customer_id: d.customerId };
        }
        case 'PROCESS_ORDER_LINE': {
          return this.modernService.processOrderLine(args[0], args[1], args[2], args[3]);
        }
        case 'INCREMENT_ORDER': {
          const new_total = await this.modernService.incrementOrderTotal(args[0], args[1]);
          return { new_total };
        }
        case 'SUMMARIZE_ORDERS': {
          const s = await this.modernService.summarizeCustomerOrders(args[0]);
          return { order_count: s.count, total_ordered_amount: s.total };
        }
        case 'GET_CUSTOMER_ORDERS_PROFILE': {
          const p = await this.modernService.getCustomerOrdersProfile(args[0]);
          return {
            customer: p.customer,
            orders: p.orders.map((o: any) => ({ order_id: o.order_id, total: o.total.toFixed(2) })),
            summary: {
              order_count: p.summary.order_count,
              gross_total: p.summary.gross_total.toFixed(2),
              discount_total: p.summary.discount_total.toFixed(2),
              net_total: p.summary.net_total.toFixed(2)
            }
          };
        }
        case 'PROCESS_BATCH_REPORT': {
          const amounts = args[1].toString().split(',').map((amount: string) => new Decimal(amount));
          return this.modernService.processBatchReport(args[0], amounts);
        }
        case 'VALIDATE_DISCOUNT_THRESHOLD': {
          const result = await this.modernService.validateDiscountThreshold(args[0], args[1]);
          return {
            customer_id: args[0].toString(),
            valid: result.valid,
            final_discount: result.finalDiscount,
            max_discount: new Decimal('50.00')
          };
        }
        case 'CONTEXT_DEMO_FLOW': {
          return this.modernService.runSharedContextDemoFlow(args[0], args[1], args[2]);
        }
        case 'DELETE_ORDER': {
          const r = await this.modernService.deleteOrder(args[0]);
          return { found: r.found, deleted_order_id: r.deletedOrderId, remaining_count: r.remainingOrderCount };
        }
        case 'DELETE_CUSTOMER': {
          const r = await this.modernService.deleteCustomer(args[0]);
          return { found: r.found, deleted_customer_id: r.deletedCustomerId, remaining_count: r.remainingCustomerCount };
        }
        case 'SEARCH_CUSTOMERS': {
          const r = await this.modernService.searchCustomers(args[0]);
          return { query: args[0], results: r.customers.map(c => ({ id: c.customerId, name: c.customerName })), count: r.count };
        }
        case 'LIST_ORDERS': {
          const r = await this.modernService.listOrders(args[0]);
          return { customer_id: args[0], orders: r.orders.map((o: any) => ({ id: o.orderId, total: (o.totalCents / 100).toFixed(2) })), count: r.count };
        }
        default:
          return { error: 'COMMAND_NOT_MAPPED' };
      }
    } catch (e: any) {
      return { error: e.message };
    }
  }

  private normalizeValue(value: any): any {
    if (value instanceof Decimal) return value.toFixed(2);
    if (Array.isArray(value)) return value.map((v) => this.normalizeValue(v));
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, this.normalizeValue(v)])
      );
    }
    return value;
  }

  private buildStateDiff(legacy: any, modern: any, path = ''): Array<{ field: string; legacy: unknown; modern: unknown }> {
    if (Object.is(legacy, modern)) return [];

    if (Array.isArray(legacy) && Array.isArray(modern)) {
      const maxLen = Math.max(legacy.length, modern.length);
      const diffs: Array<{ field: string; legacy: unknown; modern: unknown }> = [];
      for (let i = 0; i < maxLen; i += 1) {
        const childPath = `${path}[${i}]`;
        diffs.push(...this.buildStateDiff(legacy[i], modern[i], childPath));
      }
      return diffs;
    }

    if (legacy && modern && typeof legacy === 'object' && typeof modern === 'object') {
      const keys = new Set([...Object.keys(legacy), ...Object.keys(modern)]);
      const diffs: Array<{ field: string; legacy: unknown; modern: unknown }> = [];
      for (const key of keys) {
        const childPath = path ? `${path}.${key}` : key;
        diffs.push(...this.buildStateDiff(legacy[key], modern[key], childPath));
      }
      return diffs;
    }

    return [{ field: path || '<root>', legacy, modern }];
  }

  diffStates(legacy: any, modern: any): Array<{ field: string; legacy: unknown; modern: unknown }> {
    return this.buildStateDiff(this.normalizeValue(legacy), this.normalizeValue(modern));
  }

  async verifyParity(input: { command: string; args: any[] }): Promise<{ parity: boolean; legacy: any; modern: any; diff: Array<{ field: string; legacy: unknown; modern: unknown }> }> {
    const [legacy, modern] = await Promise.all([this.callLegacy(input), this.callModern(input)]);
    const diff = this.diffStates(legacy, modern);
    return {
      parity: diff.length === 0,
      legacy,
      modern,
      diff
    };
  }

  // Backwards compatibility for legacy test scripts
  async legacyGetDetails(id: string) { return this.callLegacy({ command: 'GET_DETAILS', args: [id] }); }
  async modernGetDetails(id: string) { return this.callModern({ command: 'GET_DETAILS', args: [id] }); }
  async legacyUpdateStatus(id: string, s: string) { return this.callLegacy({ command: 'UPDATE_STATUS', args: [id, s] }); }
  async modernUpdateStatus(id: string, s: any) { return this.callModern({ command: 'UPDATE_STATUS', args: [id, s] }); }
  async legacyUpdateProfile(id: string, patch: any) { return this.callLegacy({ command: 'UPDATE_PROFILE', args: [id, typeof patch === 'string' ? patch : JSON.stringify(patch)] }); }
  async modernUpdateProfile(id: string, patch: any) { return this.callModern({ command: 'UPDATE_PROFILE', args: [id, typeof patch === 'string' ? patch : JSON.stringify(patch)] }); }
  async legacyDiscount(id: string, a: number) { return this.callLegacy({ command: 'CALC_DISCOUNT', args: [id, a] }); }
  async modernDiscount(id: string, a: number) { return this.callModern({ command: 'CALC_DISCOUNT', args: [id, a] }); }
  async legacyCalculateDiscount(id: string, a: number) { return this.callLegacy({ command: 'CALCULATE_DISCOUNT', args: [id, a] }); }
  async modernCalculateDiscount(id: string, a: number) { return this.callModern({ command: 'CALCULATE_DISCOUNT', args: [id, a] }); }
  async legacySummary(id: string) { return this.callLegacy({ command: 'GET_SUMMARY', args: [id] }); }
  async modernSummary(id: string) { return this.callModern({ command: 'GET_SUMMARY', args: [id] }); }
  async legacyBatch(ids: string[]) { return this.callLegacy({ command: 'BATCH_GET', args: [ids.join(',')] }); }
  async modernBatch(ids: string[]) { return this.callModern({ command: 'BATCH_GET', args: [ids.join(',')] }); }
  async legacyCreateCustomer(n: string, s: string, b: number) { return this.callLegacy({ command: 'CREATE_CUSTOMER', args: [n, s, b] }); }
  async modernCreateCustomer(n: string, s: string, b: number) { return this.callModern({ command: 'CREATE_CUSTOMER', args: [n, s, b] }); }
  async legacyProcessNew(n: string) { return this.callLegacy({ command: 'PROCESS_NEW', args: [n] }); }
  async modernProcessNew(n: string) { return this.callModern({ command: 'PROCESS_NEW', args: [n] }); }
  async legacyHeader(userId: string, date: string) { return this.callLegacy({ command: 'AUDIT_HEADER', args: [userId, date] }); }
  async modernHeader(userId: string, date: string) { return this.callModern({ command: 'AUDIT_HEADER', args: [userId, date] }); }
  async legacyCreateOrder(customerId: string, total: number) { return this.callLegacy({ command: 'CREATE_ORDER', args: [customerId, total] }); }
  async modernCreateOrder(customerId: string, total: number) { return this.callModern({ command: 'CREATE_ORDER', args: [customerId, total] }); }
  async legacyPayment(customerId: string, amount: number) { return this.callLegacy({ command: 'PROCESS_PAYMENT', args: [customerId, amount] }); }
  async modernPayment(customerId: string, amount: number) { return this.callModern({ command: 'PROCESS_PAYMENT', args: [customerId, amount] }); }
  async legacyPaymentGen(customerId: string, amount: number) { return this.callLegacy({ command: 'PROCESS_PAYMENT_GEN', args: [customerId, amount] }); }
  async modernPaymentGen(customerId: string, amount: number) { return this.callModern({ command: 'PROCESS_PAYMENT_GEN', args: [customerId, amount] }); }
  async legacyGetOrder(orderId: string) { return this.callLegacy({ command: 'GET_ORDER', args: [orderId] }); }
  async modernGetOrder(orderId: string) { return this.callModern({ command: 'GET_ORDER', args: [orderId] }); }
  async legacyProcessOrderLine(orderId: string, quantity: number, unitPrice: number, loyaltyTier: string) { return this.callLegacy({ command: 'PROCESS_ORDER_LINE', args: [orderId, quantity, unitPrice, loyaltyTier] }); }
  async modernProcessOrderLine(orderId: string, quantity: number, unitPrice: number, loyaltyTier: string) { return this.callModern({ command: 'PROCESS_ORDER_LINE', args: [orderId, quantity, unitPrice, loyaltyTier] }); }
  async legacyIncrementOrder(orderId: string, amount: number) { return this.callLegacy({ command: 'INCREMENT_ORDER', args: [orderId, amount] }); }
  async modernIncrementOrder(orderId: string, amount: number) { return this.callModern({ command: 'INCREMENT_ORDER', args: [orderId, amount] }); }
  async legacySummarizeOrders(customerId: string) { return this.callLegacy({ command: 'SUMMARIZE_ORDERS', args: [customerId] }); }
  async modernSummarizeOrders(customerId: string) { return this.callModern({ command: 'SUMMARIZE_ORDERS', args: [customerId] }); }
  async legacyCustomerOrdersProfile(customerId: string) { return this.callLegacy({ command: 'GET_CUSTOMER_ORDERS_PROFILE', args: [customerId] }); }
  async modernCustomerOrdersProfile(customerId: string) { return this.callModern({ command: 'GET_CUSTOMER_ORDERS_PROFILE', args: [customerId] }); }
  async legacyBatchReport(customerId: string, amounts: number[]) { return this.callLegacy({ command: 'PROCESS_BATCH_REPORT', args: [customerId, amounts.join(',')] }); }
  async modernBatchReport(customerId: string, amounts: number[]) { return this.callModern({ command: 'PROCESS_BATCH_REPORT', args: [customerId, amounts.join(',')] }); }
  async legacyValidateDiscountThreshold(customerId: string, proposedDiscount: number) { return this.callLegacy({ command: 'VALIDATE_DISCOUNT_THRESHOLD', args: [customerId, proposedDiscount] }); }
  async modernValidateDiscountThreshold(customerId: string, proposedDiscount: number) { return this.callModern({ command: 'VALIDATE_DISCOUNT_THRESHOLD', args: [customerId, proposedDiscount] }); }
  async legacyContextDemoFlow(customerId: string, profilePatch: Record<string, unknown>, nextStatus: string) { return this.callLegacy({ command: 'CONTEXT_DEMO_FLOW', args: [customerId, JSON.stringify(profilePatch), nextStatus] }); }
  async modernContextDemoFlow(customerId: string, profilePatch: Record<string, unknown>, nextStatus: string) { return this.callModern({ command: 'CONTEXT_DEMO_FLOW', args: [customerId, JSON.stringify(profilePatch), nextStatus] }); }
  async legacyDeleteOrder(id: string) { return this.callLegacy({ command: 'DELETE_ORDER', args: [id] }); }
  async modernDeleteOrder(id: string) { return this.callModern({ command: 'DELETE_ORDER', args: [id] }); }
  async legacyDeleteCustomer(id: string) { return this.callLegacy({ command: 'DELETE_CUSTOMER', args: [id] }); }
  async modernDeleteCustomer(id: string) { return this.callModern({ command: 'DELETE_CUSTOMER', args: [id] }); }
  async legacySearchCustomers(q: string) { return this.callLegacy({ command: 'SEARCH_CUSTOMERS', args: [q] }); }
  async modernSearchCustomers(q: string) { return this.callModern({ command: 'SEARCH_CUSTOMERS', args: [q] }); }
  async legacyListOrders(id: string) { return this.callLegacy({ command: 'LIST_ORDERS', args: [id] }); }
  async modernListOrders(id: string) { return this.callModern({ command: 'LIST_ORDERS', args: [id] }); }
}
