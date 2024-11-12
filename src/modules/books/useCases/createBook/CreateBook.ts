import { Book } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateBookDTO } from "../../dtos/CreateBookDTO"; 

export class CreateBookUseCase {
  async execute({ title, author, year, edition, publisher, volume, isbn, totalPages, totalCopies }: CreateBookDTO): Promise<Book> {
    const bookAlreadyExists = await prisma.book.findUnique({
      where: { isbn }
    });

    if (bookAlreadyExists) {
      throw new Error("Book already exists");
    }

    const book = await prisma.book.create({
      data: { title, author, year, edition, publisher, volume, isbn, totalPages, totalCopies }
    });

    return book;
  }
}
