import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './jwt-strategy';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'tempSecretKey',
			signOptions: {
				expiresIn: 3600,
			}
		}),
		TypeOrmModule.forFeature([UserRepository])],
	controllers: [AuthController],
	providers: [AuthService, UserRepository, JwtStrategy],
	exports: [JwtStrategy],
})
export class AuthModule { }