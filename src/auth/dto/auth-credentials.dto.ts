import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	username: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(30)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password is too weak!' })
	password: string;
}