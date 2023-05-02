import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@infrastructure/usecases';
import { IsNotEmpty, IsOptional } from '@infrastructure/http/validators';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';

class UpdateUserProfileDTO {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  email: string;
}

@Injectable()
class UpdateUserProfileUseCase implements UseCase<User> {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  doit(params: UpdateUserProfileDTO): Promise<User> {
    return this.userRepository.updateProfileData({
      userId: params.id,
      name: params.name,
      email: params.email,
    });
  }
}

export { UpdateUserProfileUseCase, UpdateUserProfileDTO };
