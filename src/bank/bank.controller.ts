import { Request, Response } from "express";
import { BankService } from "./bank.service";

export class BankController {
  private readonly bankService: BankService;
  constructor() {
    this.bankService = new BankService();
  }

  getAccounts(req: Request, res: Response) {
    const responseService = this.bankService.findAll();

    res
      .status(responseService.statusCode)
      .json({ message: responseService.message, data: responseService.data });
  }

  createAccount(req: Request, res: Response) {
    const responseService = this.bankService.createAccount(
      req.body,
      req.body.payload
    );

    res
      .status(responseService.statusCode)
      .json({ message: responseService.message, data: responseService.data });
  }

  deposit(req: Request, res: Response) {
    const responseService = this.bankService.deposit(
      req.body.payload.id,
      req.body.value
    );

    res
      .status(responseService.statusCode)
      .json({ message: responseService.message, data: responseService.data });
  }

  transfer(req: Request, res: Response) {
    const responseService = this.bankService.transferer(
      req.body.recipientAccount,
      req.body.value,
      req.body.payload
    );

    res.status(responseService.statusCode).json({
      message: responseService.message,
      statusCode: responseService.statusCode,
      data: responseService.data,
    });
  }
}
