import { NextFunction, Request, Response } from "express";
import { AuthJwt } from "../../../auth/jwt/authJwt.service";

export class MiddlewareJwtToken {
  authJwt: AuthJwt;
  constructor() {
    this.authJwt = new AuthJwt();
  }

  verifyToken(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.headers.authorization;

    if (!token || !this.authJwt.verifyToken(token)) {
      res
        .status(401)
        .json({ message: "Usuário não autorizado", statusCode: 401 });
      return;
    }

    next();
  }
}
