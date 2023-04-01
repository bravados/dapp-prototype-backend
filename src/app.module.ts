import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@config/configuration';
import { HealthModule } from '@/infrastructure/health/health.module';
import { UserModule } from '@contexts/users/user.module';
import { NftsModule } from '@contexts/nfts/nfts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env'],
    }),
    UserModule,
    NftsModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
