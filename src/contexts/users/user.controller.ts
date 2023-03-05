import { VerifiedUserInterceptor } from '@infrastructure/http/interceptors';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  FindByWalletUseCase,
  FindByWalletUseCaseDTO,
} from './usecases/findByWallet.user.usecase';
import { User } from './user.entity';

@Controller('/users')
@UseInterceptors(VerifiedUserInterceptor)
class UserController {
  constructor(
    @Inject('FindByWalletUseCase')
    private findByWalletUseCase: FindByWalletUseCase,
  ) {}

  @Get('/:blockchain/:address')
  async getByWalletAddress(
    @Param() params: FindByWalletUseCaseDTO,
  ): Promise<User> {
    try {
      return await this.findByWalletUseCase.doit(params);
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}

export { UserController };
