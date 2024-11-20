import { Usuario } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { UpdateUserDTO } from "../../dtos/UpdateUserDTO";

export class UpdateUserUseCase {
  async execute({
    usuarioId,
    email,
    nome,
    cpf,
    telefone,
    permissaoId,
  }: UpdateUserDTO): Promise<Usuario> {
    const user = await prisma.usuario.findUnique({
      where: {
        id: usuarioId,
      },
      include: {
        permissoes: true, 
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const updatedUser = await prisma.usuario.update({
      where: {
        id: usuarioId,
      },
      data: {
        email,
        nome,
        cpf,
        telefone,
        permissoes: {
          update: {
            where: {
              usuarioId_permissaoId: {
                usuarioId,
                permissaoId: user.permissoes[0]?.permissaoId,
              },
            },
            data: {
              permissaoId,
            },
          },
        },
      },
    });

    return updatedUser;
  }
}
