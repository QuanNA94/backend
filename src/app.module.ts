import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CloudinaryService } from './cloudinary.service';
import { AuthModule } from './frameworks/auth/auth.module';
import { ControllersModule } from './gateways/controllers/controllers.module';
import { ImageController } from './image.controller';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req, res }) => ({ req, res }),
        }),
        TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            logging: true,
            synchronize: true,

            // synchronize: false,
            // migrationsTableName: 'typeorm_migrations',
            // migrationsRun: false,
        }),
        MulterModule.register({
            dest: './uploads', // Destination folder for uploaded files
        }),
        ControllersModule,
        AuthModule,
    ],
    controllers: [ImageController],
    providers: [CloudinaryService],
})
export class AppModule {}
