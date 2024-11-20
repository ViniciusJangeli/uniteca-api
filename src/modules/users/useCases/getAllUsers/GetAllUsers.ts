import { Usuario } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetAllUsersUseCase {
  async execute(): Promise<Usuario[]> {

    const users = await prisma.usuario.findMany();

    return users;
  }
}
