import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { UserRole } from '@/domain/enums/roles.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    username?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @Field(() => UserRole, { nullable: true })
    @IsOptional()
    @IsString()
    role?: UserRole;
}
