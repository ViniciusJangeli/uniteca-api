import { prisma } from "../../../../prisma/client";
import { SubPermissoes } from "@prisma/client";

export class GetSubPermissionsUseCase {
  async execute(): Promise<SubPermissoes[]> {
    return await prisma.subPermissoes.findMany();
  }
}
