import { ExecutionContext } from '@nestjs/common';
declare const OptionalJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
/**
 * Optional JWT Auth Guard
 * This guard does not throw an error if no token is provided.
 * Instead, it allows the request to proceed with user as undefined.
 * Useful for endpoints that can work both for authenticated and anonymous users.
 */
export declare class OptionalJwtAuthGuard extends OptionalJwtAuthGuard_base {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
    handleRequest(err: any, user: any): any;
}
export {};
