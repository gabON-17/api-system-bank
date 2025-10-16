import { BankService } from "../service/bank.service";

class BankController {
  private bankService: BankService;
  constructor() {
    this.bankService = new BankService();
  }
}
