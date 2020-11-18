export class SpecialOffer{
    productId: {type:String, required: true};
    title:String;
    startDate:{type:Date,default:null};
    endDate:{type:Date,default:null};
    discount:Number;
    
}
