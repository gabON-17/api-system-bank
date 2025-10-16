import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";

class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  login(loginDto: LoginDto) {
    this.authService.login(loginDto);
  }
}
