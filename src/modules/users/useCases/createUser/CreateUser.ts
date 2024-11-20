import { Usuario } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { genSaltSync, hashSync } from "bcryptjs";

export class CreateUserUseCase {
  async execute({ email, senha, nome, cpf, telefone, cargoId }: CreateUserDTO): Promise<Usuario> {
    // Verifica se o usuário já existe pelo email ou CPF
    const userAlreadyExists = await prisma.usuario.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }

    // Gera uma senha aleatória caso nenhuma seja fornecida
    const initialPassword = senha || 'Trocar@123';

    // Criptografa a senha
    const salt = genSaltSync(10);
    const passwordHashed = hashSync(initialPassword, salt);

    // Cria o usuário e relaciona com o cargo
    const user = await prisma.usuario.create({
      data: {
        email,
        nome,
        cpf,
        telefone,
        senha: passwordHashed,
        permissoes: {
          create: {
            permissaoId: cargoId, // Relaciona o cargo como permissão do usuário
          },
        },
      },
    });

    // Retorna o usuário criado
    return user;
  }
}
