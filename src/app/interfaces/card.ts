export interface Card {
    id?: number;
    title: string;
    list: number;
    table: number;
    members?: number[];
    status?: number;
    label?: string;
    createDate?: string;
    expiredDate?: string;
    successDate?: string;
}
