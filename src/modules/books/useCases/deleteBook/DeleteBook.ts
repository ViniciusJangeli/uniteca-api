import { prisma } from "../../../../prisma/client";

export class DeleteBookUseCase {
  async execute(id: string): Promise<void> {
    await prisma.book.delete({
      where: { id }
    });
  }
}
