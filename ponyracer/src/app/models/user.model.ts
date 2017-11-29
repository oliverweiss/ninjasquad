export interface UserModel {
    id: number;
    login: string;
    money: number;
    registratioInstant: Date;
    token?: string;
}
