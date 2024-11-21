import { prisma } from "../../../../prisma/client";
import { EditFineDTO } from "../../dtos/EditeFineDTO";

export class EditFineUseCase {
    async execute({ multaId, status }: EditFineDTO): Promise<{ message: string }> {
      await prisma.historicoMultas.update({
        where: { id: multaId },
        data: { status },
      });
  
      return { message: "Status da multa atualizado com sucesso" };
    }
  }
  