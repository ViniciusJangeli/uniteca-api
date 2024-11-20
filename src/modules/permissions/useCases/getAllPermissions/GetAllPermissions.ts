import { prisma } from "../../../../prisma/client";
import { Permissao } from "@prisma/client";

export class GetPermissionsUseCase {
  async execute(): Promise<Permissao[]> {
    return await prisma.permissao.findMany();
  }
}
