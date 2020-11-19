export class RegisterInfo {
    public email: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public country: string;
    public userType: String;
    public companyName: String;
    public tinNumber: Number;
    public mobile: String;

    constructor(email: string, password: string, firstName: string, lastName: string, country: string, userType: string, companyName: string, tinNumber: number, mobile: string) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.country = country;
        this.userType = userType;
        this.companyName = companyName;
        this.tinNumber = tinNumber;
        this.mobile = mobile;
    }
}