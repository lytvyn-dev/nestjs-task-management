import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userRepository: UserRepository
	) {
		super({
			secretOrKey: 'tempSecretKey',
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { username } = payload;
		const user = await this.userRepository.findOne({ where: { username } })

		if (!user) throw new UnauthorizedException();

		return user;
	};
}
