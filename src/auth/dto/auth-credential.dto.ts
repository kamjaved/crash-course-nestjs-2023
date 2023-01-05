import {
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
	Matches,
} from 'class-validator';
export class AuthCredentialDto {
	@IsString()
	@MinLength(6)
	@MaxLength(32)
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(32)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			'password is weak use storng password with uppercase,lowercase & special character',
	})
	password: string;
}
