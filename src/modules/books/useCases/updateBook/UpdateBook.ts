import { prisma } from "../../../../prisma/client";
import { UpdateBookDTO } from "../../dtos/UpdateBookDTO";

export class UpdateBookUseCase {
  async execute(data: UpdateBookDTO) {
    try {
      const updatedBook = await prisma.livro.update({
        where: { id: data.id },
        data,
      });
      return updatedBook;
    } catch (error) {
      throw new Error("Erro ao atualizar livro");
    }
  }
}
