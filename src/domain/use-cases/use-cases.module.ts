import { Module } from '@nestjs/common';
import { AuthenticateUseCase } from './auth/authenticate-user-use-case';

const useCases = [AuthenticateUseCase];

@Module({
    imports: [],
    providers: [...useCases],
    exports: [...useCases],
})
export class UseCasesModule {}
