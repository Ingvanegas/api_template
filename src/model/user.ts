export interface user {
    id: number;
    username: string;
    password: string;
    identification: string;
    name: string;
    last_name: string;
    address: string;
    phone: string;
    email: string;
    role: number;
    fk_employed: number;
    datecreation: Date;
    dateexpire: Date;
}