import { Livro } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateBookDTO } from "../../dtos/CreateBookDTO";

export class CreateBookUseCase {
  async execute({
    titulo,
    autor,
    ano,
    edicao,
    editora,
    volume,
    isbn,
    totalPaginas,
    totalExemplares,
    criadoPorId,
  }: CreateBookDTO): Promise<{ data: Livro; message: string }> {
    const bookAlreadyExists = await prisma.livro.findUnique({
      where: { isbn },
    });

    if (bookAlreadyExists) {
      throw new Error("Livro já existe!");
    }

    const book = await prisma.livro.create({
      data: {
        titulo,
        autor,
        ano,
        edicao,
        editora,
        volume,
        isbn,
        totalPaginas,
        totalExemplares,
        criadoPorId,
      },
    });

    return { data: book, message: "Livro criado com sucesso" };
  }
}
