export interface CreateUserDTO {
    email: string;
    senha: string;
    nome: string;
    cpf: string;
    telefone?: string;
    permissaoId: string;
  }