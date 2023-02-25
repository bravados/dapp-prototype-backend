import { Entity } from '@infrastructure/database/entity';

enum UserType {
  ARTIST = 'ARTIST',
  INDIVIDUAL = 'INDIVIDUAL',
  ADMIN = 'ADMIN',
}

class User extends Entity {
  name: string;
  email: string;
  avatar: string;
  type: UserType;
}

export { User, UserType };
