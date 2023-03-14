import { user as userMock } from '@contexts/users/__mocks__/user';
import { Blockchain } from '@contexts/wallets/wallet.entity';
import { CreateUserDTO, CreateUserUseCase } from '../createUser.usecase';

const userRepositoryMock = {
  create: jest.fn(),
  findByWallet: jest.fn(),
};

jest.mock('@contexts/users/user.repository', () => ({
  userRepository: userRepositoryMock,
}));

const getOrCreateDto = {
  blockchain: 'near',
  address: '123',
} as CreateUserDTO;

describe('createUser', () => {
  describe('when the user is created successfully in the db', () => {
    beforeEach(() => {
      userRepositoryMock.create.mockReturnValue(userMock);
    });
    it('returns the user', async () => {
      const createUserUseCase = new CreateUserUseCase(userRepositoryMock);

      expect(await createUserUseCase.doit(getOrCreateDto)).toBe(userMock);
      expect(userRepositoryMock.create).toHaveBeenCalledWith({
        name: `${getOrCreateDto.address}`,
        type: 'INDIVIDUAL',
        wallets: [
          {
            blockchain: getOrCreateDto.blockchain.toUpperCase() as Blockchain,
            address: getOrCreateDto.address,
          },
        ],
      });
    });
  });
  describe('when the user cannot be created in the db', () => {
    beforeEach(() => {
      userRepositoryMock.create.mockRejectedValue(new Error());
    });

    it('throws error', () => {
      const createUserUseCase = new CreateUserUseCase(userRepositoryMock);

      expect(createUserUseCase.doit(getOrCreateDto)).rejects.toThrowError();
    });
  });
});
