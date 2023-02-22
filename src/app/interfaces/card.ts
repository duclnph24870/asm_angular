export interface Card {
    id: number;
    title: string;
    list: number;
    members: number[];
    status: number;
    createDate: string;
    expiredDate: string;
    successDate?: string;
}
