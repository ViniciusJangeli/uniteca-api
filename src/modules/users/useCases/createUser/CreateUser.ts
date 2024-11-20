import { Usuario } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { genSaltSync, hashSync } from "bcryptjs";

export class CreateUserUseCase {
  async execute({ email, senha, nome, cpf, telefone, permissaoId }: CreateUserDTO): Promise<Usuario> {
    const userAlreadyExists = await prisma.usuario.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }

    const initialPassword = senha || 'Trocar@123';

    const salt = genSaltSync(10);
    const passwordHashed = hashSync(initialPassword, salt);

    const user = await prisma.usuario.create({
      data: {
        email,
        nome,
        cpf,
        telefone,
        senha: passwordHashed,
        permissoes: {
          create: {
            permissaoId: permissaoId,
          },
        },
      },
    });

    return user;
  }
}
