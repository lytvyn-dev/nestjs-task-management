import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@Get()
	getUsers(): Promise<User[]> {
		return this.authService.getUsers();
	}

	@Post('/sign-up')
	signUp(@Body() authCredentials: AuthCredentialsDto): Promise<void> {
		return this.authService.signUp(authCredentials);
	}

	@Post('/sign-in')
	signIn(@Body() authCredentials: AuthCredentialsDto): Promise<string> {
		return this.authService.signIn(authCredentials);
	}
}

