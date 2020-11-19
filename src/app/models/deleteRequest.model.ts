export class DeleteRequest {
    public name: string;
    public email: string;
    public reason: string;
    public message?:string;

    constructor(name :string, email: string, reason: string, message: string) {
        this.name = name;
        this.email = email;
        this.reason = reason;
        this.message = message;
    }
}