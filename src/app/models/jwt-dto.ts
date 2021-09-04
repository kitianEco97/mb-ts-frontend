export class JwtDTO {
    token: string | null = '';

    constructor(token: string) {
        this.token = token;
    }
}
