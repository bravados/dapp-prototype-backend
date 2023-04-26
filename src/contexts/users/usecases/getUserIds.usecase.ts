import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
class GetUserIdsUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async doit(): Promise<number[]> {
    return this.userRepository.getAllIds();
  }
}

export { GetUserIdsUseCase };
