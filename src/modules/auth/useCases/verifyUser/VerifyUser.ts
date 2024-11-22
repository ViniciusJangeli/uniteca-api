// src/useCases/VerifyEmailCpf.ts
import { prisma } from "../../../../prisma/client";
import { VerifyEmailCpfDTO } from "../../dtos/VerifyUserDTO";

export class VerifyEmailCpf {
  async execute({ email, cpf }: VerifyEmailCpfDTO) {
    const user = await prisma.usuario.findFirst({
      where: {
        email,
        cpf,
      },
    });

    if (!user) {
      throw new Error("Email ou CPF inválidos.");
    }

    return { id: user.id, message: "Verificação bem-sucedida." };
  }
}
