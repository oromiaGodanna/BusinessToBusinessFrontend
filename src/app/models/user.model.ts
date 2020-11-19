
export class UserProfile {
  public email: string;
  public firstName: string;
  public lastName: string;
  public userType: string;
  public companyName: string;
  public tinNumber: number;
  public alternativeEmail: String;
  public mobile: string;
  public telephone: string;
  public country: String;
  public socialLinks: {
    facebook?: string,
    twitter?: string,
    instagram?: string
    linkedIn?: string
  };
  public fax?: number;
  public yearEstablished?: number;
  public businessType?: string;
  public numOfEmployees?: number;
  public address?: String;
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
    country: string,
    facebook: string,
    twitter: string,
    instagram: string,
    linkedIn: string,
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
      this.alternativeEmail = alternativeEmail,
      this.mobile = mobile,
      this.telephone = telephone,
      // this.socialLinks.facebook = facebook,
      // this.socialLinks.instagram = instagram,
      // this.socialLinks.twitter = twitter,
      // this.socialLinks.linkedIn = linkedIn,
      this.fax = fax,
      this.tinNumber = tinNumber,
      this.yearEstablished = yearEstablished,
      this.businessType = businessType,
      this.numOfEmployees = numOfEmployees,
      this.country = country,
      this.address = address,
      this.officalWebsite = officalWebsite,
      this.aboutUs = aboutUs
  }
}

