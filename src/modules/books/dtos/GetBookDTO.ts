export interface GetBook{
    id: string;
    titulo: string;
    autor: string;
    ano: number;
    edicao: number | null;
    editora: string;
    volume: number | null;
    isbn: string;
    totalPaginas: number;
    totalExemplares: number;
}