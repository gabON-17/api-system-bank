import jwt, {
  JsonWebTokenError,
  Jwt,
  JwtHeader,
  JwtPayload,
} from "jsonwebtoken";
import { env } from "process";
import { ResponseService } from "../../common/types/response.type";

export class AuthJwt {
  generateToken(userName: string, userId: number): string {
    const payload: JwtPayload = { userName, userId };

    const token = jwt.sign(payload, env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return token;
  }

  verifyToken(token: string): Boolean {
    try {
      const validateJwt = jwt.verify(token, process.env.JWT_SECRET!);
      return true;
    } catch (e: unknown) {
      if (e instanceof JsonWebTokenError) return false;
    }
    return false;
  }
}
