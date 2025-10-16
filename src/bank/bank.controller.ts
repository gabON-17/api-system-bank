import { BankService } from "./bank.service";

class BankController {
  private bankService: BankService;
  constructor() {
    this.bankService = new BankService();
  }
}
