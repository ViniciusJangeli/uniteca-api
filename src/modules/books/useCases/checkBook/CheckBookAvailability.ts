import { prisma } from "../../../../prisma/client";


export class CheckBookAvailabilityUseCase {
    async execute(bookId: string): Promise<boolean> {

      const availableCopies = await prisma.bookCopy.count({
        where: {
          bookId,
          isAvailable: true
        }
      });

      return availableCopies > 0;
    }
  }
  