export interface RefreshTokenRequest {
    grant_type: 'refresh_token';
    refresh_token: string;
}
