import { Blockchain } from '@contexts/wallets/wallet.entity';
import {
  registerDecorator,
  ValidationOptions,
  IsAlphanumeric,
} from 'class-validator';

function IsSupportedBlockchain(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsSupportedBlockchain',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' && value.toUpperCase() == Blockchain.NEAR
          ); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}

export { IsAlphanumeric, IsSupportedBlockchain };
