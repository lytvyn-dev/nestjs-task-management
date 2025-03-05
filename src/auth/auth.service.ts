import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
	constructor(private readonly userRepository: UserRepository) { }

	async getUsers(): Promise<User[]> {
		return await this.userRepository.find();
	}

	async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
		return await this.userRepository.createUser(authCredentials);
	}

	async signIn(authCredentials: AuthCredentialsDto): Promise<string> {
		const { username, password } = authCredentials;
		const user = await this.userRepository.findOne({ where: { username } })

		if (user && (await bcrypt.compare(password, user.password))) {
			return 'success'
		}
		throw new UnauthorizedException('Please check your credentials!')
	}
}
