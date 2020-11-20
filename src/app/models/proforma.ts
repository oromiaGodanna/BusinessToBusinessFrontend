
export class Proforma{
    startDate:Date;
    endDate:Date;
    maxResponse:Number;
    items:Item[]
}
export class Item{
    category:String;
    subCategory:String;
    quantity:Number;
    description:String;
}