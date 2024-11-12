import { Book } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { UpdateBookDTO } from "../../dtos/UpdateBookDTO";

export class UpdateBookUseCase {
  async execute(data: UpdateBookDTO): Promise<Book> {
    const book = await prisma.book.update({
      where: { id: data.id },
      data
    });

    return book;
  }
}
