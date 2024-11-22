import { prisma } from "../../../../prisma/client";
import { UpdatePasswordDTO } from "../../dtos/UpdatePasswordDTO";
import { hashSync } from "bcryptjs";

export class UpdatePassword {
  async execute({ userId, newPassword }: UpdatePasswordDTO) {
    const hashedPassword = hashSync(newPassword, 10);

    await prisma.usuario.update({
      where: { id: userId },
      data: { senha: hashedPassword },
    });

    return { message: "Senha atualizada com sucesso!" };
  }
}