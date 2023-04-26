import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

class GetUserByIdDTO {
  id: string;
}

@Injectable()
class GetUserByIdUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async doit(getUserByIdDTO: GetUserByIdDTO): Promise<User | null> {
    const userId = parseInt(getUserByIdDTO.id);

    return this.userRepository.findById(userId);
  }
}

export { GetUserByIdUseCase, GetUserByIdDTO };
