import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
	constructor(private readonly dataSource: DataSource) {
		super(User, dataSource.createEntityManager());
	}

	async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
		const { username, password } = authCredentials;

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = this.create({
			username,
			password: hashedPassword,
		})

		try {
			await this.save(newUser);
		} catch (error) {
			const dbError = error as { code?: string };
			if (dbError.code === '23505') { // duplicate code
				throw new ConflictException('Username already exists!');
			}
			throw new InternalServerErrorException();
		}
	}
};