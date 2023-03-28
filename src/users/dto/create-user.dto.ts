import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty({message: "Login mustn't be empty."})
    readonly login: string;

    @IsString()
    @IsNotEmpty({message: "Password mustn't be empty."})
    @MinLength(4, {message: "Password is too short, require at least 4 characters."})
    readonly password: string;
}
