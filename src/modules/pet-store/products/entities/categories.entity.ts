// import { Field } from '@nestjs/graphql';
// import { BaseEntity } from 'src/database/core/base.entity';
// import { Column, OneToMany } from 'typeorm';
// import { Product } from './product.entity';

// export class Category extends BaseEntity {
//     @Field()
//     @Column('varchar', { length: 255 })
//     name: string; // Tên sản phẩm, không thể null

//     @Field(() => [Product])
//     @OneToMany(() => Product, (product) => product.category)
//     products: Product[];
// }
