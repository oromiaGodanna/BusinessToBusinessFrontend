
export interface Email{

    _id?: string;
    sender: string;
    recipients: [string];
    date?: Date;
    to: [string];
    subject: string;
    username: [string];
    intro: [string];
    instructions: string;
    buttonText: string;
    buttonLink: string;

}


export interface Sms{

    _id: string;
    sender: string;
    recipients: [string];
    to: [string];
    body: string;
    
}