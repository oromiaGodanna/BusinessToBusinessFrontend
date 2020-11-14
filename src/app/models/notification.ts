
export interface SysNotification{

    _id?: string;
    notificationType: string;
    recipients: string[];
    date?: Date;
    title: string;
    content: string;
    target: string;
    externalModelType: string;
    viewed?: boolean;
    // sender: string;
}

export enum externalModelType { 'Customer', 'Order', 'Performa'};  // for promotion we link to profile page of customer

export enum notificationType { 'promotion', 'order', 'performa' };