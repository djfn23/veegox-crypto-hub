
import { balanceService } from "./fiat/balanceService";
import { cryptoPurchaseService } from "./fiat/cryptoPurchaseService";
import { transactionService } from "./fiat/transactionService";

export class FiatBalanceService {
  private static instance: FiatBalanceService;

  static getInstance(): FiatBalanceService {
    if (!this.instance) {
      this.instance = new FiatBalanceService();
    }
    return this.instance;
  }

  // Balance operations
  getUserFiatBalance = balanceService.getUserFiatBalance.bind(balanceService);
  upsertFiatBalance = balanceService.upsertFiatBalance.bind(balanceService);
  addFunds = balanceService.addFunds.bind(balanceService);

  // Crypto purchase operations
  getCryptoRates = cryptoPurchaseService.getCryptoRates.bind(cryptoPurchaseService);
  purchaseCrypto = cryptoPurchaseService.purchaseCrypto.bind(cryptoPurchaseService);
  getUserCryptoPurchases = cryptoPurchaseService.getUserCryptoPurchases.bind(cryptoPurchaseService);

  // Transaction operations
  getUserFiatTransactions = transactionService.getUserFiatTransactions.bind(transactionService);
}

export const fiatBalanceService = FiatBalanceService.getInstance();

// Export types for convenience
export type { FiatBalance, CryptoPurchase, FiatTransaction } from "@/types/fiatTypes";
