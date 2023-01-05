import { JwtPayload } from './dto/jwt-payload';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private jwtService: JwtService
	) {}

	async getAllUsers(): Promise<User[]> {
		return this.userRepository.find();
	}
	async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
		return this.userRepository.createUser(authCredentialDto);
	}

	async signIn(
		authCredentialDto: AuthCredentialDto
	): Promise<{ accessToken: string }> {
		const { username, password } = authCredentialDto;

		const user = await this.userRepository.findOneBy({ username });
		if (user && (await bcrypt.compare(password, user.password))) {
			const payload: JwtPayload = { username };

			const accessToken = await this.jwtService.sign(payload);
			return { accessToken };
		} else {
			throw new UnauthorizedException('Please Check your Credential');
		}
	}
}
