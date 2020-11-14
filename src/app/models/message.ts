import { User } from './user';

export interface Message {
    _id: string;
    sender: User;
    message: string;
    product: string;
    attachment: Blob,
    date: Date;
    deleted: [string];

}


export interface Conversation{
    _id: string;
    users: [string];
    messages: [Message];
    dateOfLastMessage: Date,
    deleted: [string];
}