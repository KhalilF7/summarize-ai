import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

// Define AuthController to handle authentication related requests
@Controller('auth')
export class AuthController {
    // Inject AuthService instance into the controller
    constructor(private authService: AuthService) {}

    // Define a POST endpoint to handle user sign up requests
    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        // Call the AuthService signUp method and return a Promise containing the token
        return await this.authService.signUp(signUpDto);
    }

    // Define a POST endpoint to handle user login requests
    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        // Call the AuthService login method and return a Promise containing the token
        return await this.authService.login(loginDto);
    }
}
