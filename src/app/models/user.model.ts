
export class BuyerProfile {
  public email: string;
  public firstName: string;
  public lastName: string;
  public userType: string;
  public companyName: string;
  public tinNumber: number;
  public alternativeEmail: String;
  public mobile: string;
  public telephone: string;
  constructor(
    email: string,
    firstName: string,
    lastName: string,
    userType: string,
    companyName: string,
    tinNumber: number,
    alternativeEmail: String,
    mobile: string,
    telephone: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userType = userType;
    this.companyName = companyName;
    this.tinNumber = tinNumber;
    this.alternativeEmail = alternativeEmail;
    this.mobile = mobile;
    this.telephone = telephone;
  }
}

export class SellerProfile {
  public email: string;
  public firstName: string;
  public lastName: string;
  public userType: string;
  public companyName: string;
  public tinNumber: number;
  public alternativeEmail: String;
  public mobile: string;
  public telephone: string;
  public socialLinks: Object;
  public fax: number;
  public yearEstablished: number;
  public businessType: string;
  public numOfEmployees: number;
  public address: String;
  public officalWebsite: string;
  public aboutUs: string;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    userType: string,
    companyName: string,
    tinNumber: number,
    alternativeEmail: String,
    mobile: string,
    telephone: string,
    socialLinks: object,
    fax: number,
    yearEstablished: number,
    businessType: string,
    numOfEmployees: number,
    address: string,
    officalWebsite: string,
    aboutUs: string) {

    this.email = email,
      this.firstName = firstName,
      this.lastName = lastName,
      this.userType = userType,
      this.companyName = companyName,
      this.tinNumber = tinNumber,
      this.alternativeEmail = alternativeEmail,
      this.mobile = mobile,
      this.telephone = telephone,
      this.socialLinks = socialLinks,
      this.fax = fax,  
      this.yearEstablished = yearEstablished,
      this.businessType = businessType,
      this.numOfEmployees = numOfEmployees,
      this.address = address,
      this.officalWebsite = officalWebsite,
      this.aboutUs = aboutUs
  }
}

