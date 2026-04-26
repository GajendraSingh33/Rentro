/**
 * Custom parameter decorator to extract user from request
 * Usage: @GetUser() user: User or @GetUser('id') userId: number
 */
export declare const GetUser: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
