import jwt, { JsonWebTokenError, JwtPayload, SignOptions } from "jsonwebtoken";

export class AuthJwt {
  generateToken(userName: string, userId: number): string {
    const payload: JwtPayload = { userName, userId };

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
}
