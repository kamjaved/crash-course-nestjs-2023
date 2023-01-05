import { User } from './user.entity';
import { AuthService } from './auth.service';
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get()
	getAllUsers(): Promise<User[]> {
		return this.authService.getAllUsers();
	}

	@Post('/signup')
	registerUser(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
		return this.authService.signUp(authCredentialDto);
	}

	@Post('/signin')
	loginUser(
		@Body() authCredentialDto: AuthCredentialDto
	): Promise<{ accessToken: string }> {
		return this.authService.signIn(authCredentialDto);
	}

	@Post('/test')
	@UseGuards(AuthGuard())
	test(@Req() req) {
		console.log(req);
	}
}
