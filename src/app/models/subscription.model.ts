export class Subscription {
        public name: String;
        public description: String;
        public monthlyPrice: Number;
        public numOfProducts: Number;
        public numOfQuatations: Number;
        public numOfEmails: Number;
    constructor(name: string, description: string,monthlyPrice: number, numOfProducts: number,numOfQuatations: number,numOfEmails: number) {
        this.name = name;
        this.description = description;
        this.monthlyPrice = monthlyPrice;
        this.numOfProducts = numOfProducts;
        this.numOfQuatations = numOfQuatations;
        this.numOfEmails = numOfEmails;
    }
}