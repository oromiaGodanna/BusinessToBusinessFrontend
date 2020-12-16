export class Order {    
    buyerId: string;
    sellerId: string;
    cartEntryId: Array<string>;
    totalAmount: Number;
    totalPrice: Number;
    shippingAddress:object;
    status: string;
    paymentIds: Array<string>;
}