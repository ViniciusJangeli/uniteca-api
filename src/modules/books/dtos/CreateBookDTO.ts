export interface CreateBookDTO {
  titulo: string;
  autor: string;
  ano: number;
  edicao?: number;
  editora: string;
  volume?: number;
  isbn: string;
  totalPaginas: number;
  totalExemplares: number;
  criadoPorId: string;
  }
  