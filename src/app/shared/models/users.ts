export interface Users {
    name:        string;
    lastname:    string;
    phonenumber: string;
    email:       string;
    password:       string;
}
export interface Users
{
    id: string;
    email: string;
    userType: UserType;
}

export enum UserType {
  Admin = "ADMIN",
  Customer = "CUSTOMER"
}

export interface AuthResult
{
    accessToken: string;
    user: Users;
}