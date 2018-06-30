export interface JwtTokenDecoded {
    roles: string[];
    username: string;
    iat: number;
    exp: number;
}