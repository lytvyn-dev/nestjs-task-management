import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
	) { }

	async getUsers(): Promise<User[]> {
		return await this.userRepository.find();
	}

	async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
		return await this.userRepository.createUser(authCredentials);
	}

	async signIn(authCredentials: AuthCredentialsDto): Promise<{ accessToken: string }> {
		const { username, password } = authCredentials;
		const user = await this.userRepository.findOne({ where: { username } })

		if (user && (await bcrypt.compare(password, user.password))) {
			const payload: JwtPayload = { username };
			const accessToken: string = await this.jwtService.signAsync(payload)
			return { accessToken };
		}
		throw new UnauthorizedException('Please check your credentials!')
	}
}
