import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsBoolean,
} from 'class-validator';

@InputType()
export class CreateProductDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => Float)
    @IsNumber()
    price: number;

    @Field({ nullable: true })
    @IsNumber()
    discount?: number;

    @Field()
    @IsString()
    @IsNotEmpty()
    imgUrl: string;

    @Field(() => Float, { nullable: true }) // Cho phép null nếu không bắt buộc
    @IsNumber()
    rating?: number;

    @Field(() => Int, { nullable: true }) // Cho phép null nếu không bắt buộc
    @IsNumber()
    reviewsCount?: number;

    @Field({ nullable: true })
    @IsString()
    description?: string;

    @Field(() => Float, { nullable: true }) // Cho phép null nếu không bắt buộc
    @IsNumber()
    quantity?: number;

    @Field(() => Boolean, { defaultValue: false })
    @IsOptional() // trường này không bắt buộc phải có khi create/update
    @IsBoolean()
    isFeatured?: boolean;
}
