import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

type VerificationProof = {
  blockchain: string;
  address: string;
  signature: string;
  publicKey: string;
  message: string;
};

@Injectable()
export class VerifiedUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const headers = context.switchToHttp().getRequest().headers;
    const verificationProof = headers.verificationProof as VerificationProof;

    return next.handle();
  }
}
