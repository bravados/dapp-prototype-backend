import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { VerifiedUserInterceptor } from '@infrastructure/http/interceptors';
import { User } from './user.entity';
import { GetUserUseCase, GetUserDTO } from './usecases/getUser.usecase';
import {
  CreateUserUseCase,
  CreateUserDTO,
} from './usecases/createUser.usecase';
import { GetUserIdsUseCase } from './usecases/getUserIds.usecase';
import {
  GetUserByIdDTO,
  GetUserByIdUseCase,
} from './usecases/getUserById.usecase';
import {
  UpdateUserProfileDTO,
  UpdateUserProfileUseCase,
} from './usecases/updateUserProfile.usecase';

@Controller('/users')
@UseInterceptors(VerifiedUserInterceptor)
class UserController {
  constructor(
    @Inject('GetUserUseCase')
    private getUserUseCase: GetUserUseCase,
    @Inject('GetUserIdsUseCase')
    private getUserIdsUseCase: GetUserIdsUseCase,
    @Inject('GetUserByIdUseCase')
    private getUserByIdUseCase: GetUserByIdUseCase,
    @Inject('CreateUserUseCase')
    private createUserUseCase: CreateUserUseCase,
    @Inject('UpdateUserProfileUseCase')
    private updateUserProfileUseCase: UpdateUserProfileUseCase,
  ) {}

  @Get('/:blockchain/:address')
  async getUser(@Param() getUserDTO: GetUserDTO): Promise<User> {
    const user = await this.getUserUseCase.doit(getUserDTO);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Get('/ids')
  async getUserIds(): Promise<{ ids: number[] }> {
    const ids = await this.getUserIdsUseCase.doit();

    return { ids };
  }

  @Get('/:id')
  async getUserById(@Param() getUserByIdDTO: GetUserByIdDTO): Promise<User> {
    const user = await this.getUserByIdUseCase.doit(getUserByIdDTO);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    try {
      return await this.createUserUseCase.doit(createUserDTO);
    } catch {
      Logger.error('User was not created: ', createUserDTO);
      throw new HttpException(
        'User was not created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/:id/update-profile')
  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateUserProfileDTO: UpdateUserProfileDTO,
  ): Promise<User> {
    try {
      updateUserProfileDTO.id = parseInt(id);
      return await this.updateUserProfileUseCase.doit(updateUserProfileDTO);
    } catch {
      Logger.error('User profile was not updated: ', updateUserProfileDTO);
      throw new HttpException(
        'User profile was not updated',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export { UserController };
