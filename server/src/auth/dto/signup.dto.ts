import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

// Define class for signup data transfer object (DTO)
export class SignUpDto {
    @IsNotEmpty({ message: "Name cannot be empty"})
    @IsString({ message: "Name must be a string"})
    readonly name: string;

    @IsNotEmpty({ message: "Email cannot be empty"})
    @IsEmail({}, { message: "Please enter a valid email"})
    readonly email: string;

    @IsNotEmpty({ message: "Password cannot be empty"})
    @IsString({ message: "Password must be a string"})
    @MinLength(6, { message: "Password must be at least 6 characters long"})
    readonly password: string;
}
