export interface Card {
    id?: number;
    title: string;
    list: number;
    table: number;
    members?: number[];
    success?: boolean;
    label?: string;
    date?: string[];
}
