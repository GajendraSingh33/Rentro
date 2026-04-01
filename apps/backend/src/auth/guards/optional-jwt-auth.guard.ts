import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Optional JWT Auth Guard
 * This guard does not throw an error if no token is provided.
 * Instead, it allows the request to proceed with user as undefined.
 * Useful for endpoints that can work both for authenticated and anonymous users.
 */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    // Don't throw error if no user found, just return undefined
    return user || null;
  }
}
