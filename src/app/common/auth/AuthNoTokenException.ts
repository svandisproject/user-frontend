export class AuthNoTokenException extends Error {
    constructor() {
        super('no token set , authentication required');
        this.name = 'AuthNoTokenException';
    }
}
