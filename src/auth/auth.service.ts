import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
	constructor(private readonly userRepository: UserRepository) { }

	async getUsers(): Promise<User[]> {
		return await this.userRepository.find()
	}

	async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
		return await this.userRepository.createUser(authCredentials);
	}
}
