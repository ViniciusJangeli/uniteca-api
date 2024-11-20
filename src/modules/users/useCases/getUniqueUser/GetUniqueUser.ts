import { Usuario} from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { GetUniqueUserDTO } from "../../dtos/GetUniqueUserDTO";

type UsuarioSemSenha = Omit<Usuario, 'senha'>;

export class GetUniqueUserUseCase {
  async execute({ usuarioId }: GetUniqueUserDTO): Promise<UsuarioSemSenha | null> {
    const user = await prisma.usuario.findUnique({
      where: {
        id: usuarioId,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        criadoEm: true,
        atualizadoEm: true,
        livrosCadastrados: true,
        emprestimos: {
          include: {
            livro: true,
            historicoMultas: true,
          },
        },
        permissoes: {
          include: {
            permissao: {
              select: {
                titulo: true,
                permissoesRelacao: {
                  include: {
                    subPermissao: {
                      select: {
                        descricao: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        historicoMultas: true,
      },
    });

    return user;
  }
}
