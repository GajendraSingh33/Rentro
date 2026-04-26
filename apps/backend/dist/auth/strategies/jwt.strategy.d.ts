import { AuthService } from '../auth.service';
export interface JwtPayload {
    sub: number;
    iat?: number;
    exp?: number;
}
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<import("../../typeorm/entities").User>;
}
export {};
