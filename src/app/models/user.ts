export interface User{
    _id: string;
    firstName: string;
    image?: string;
    email: string;
    userType:String;
    subscribers:[User];
}