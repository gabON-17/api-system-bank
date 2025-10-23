import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { PayloadUser } from "../../common/types/payload";

export class AuthJwt {
  generateToken(userName: string, id: number): string {
    const payload: PayloadUser = { userName, id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string);

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

  getPayload(token: string): JwtPayload | undefined {
    const payload: JwtPayload | null = jwt.decode(token, { json: true });

    if (!payload) return undefined;

    return payload;
  }
}
