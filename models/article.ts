export interface ArticleHeaderModel {
    id: number;
    name: string;
    date?: Date;
    url?: string;
}

export interface ArticleModel extends ArticleHeaderModel {
    description: string;
}