import { prisma } from "../../../../prisma/client";
import { LoginDTO } from "../../dtos/Login";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = String(process.env.JWT_SECRET);

export class Login {
  async execute({ email, password }: LoginDTO) {
    const userExists = await prisma.usuario.findFirst({
      where: {
        OR: [{ email }],
      },
    });

    if (!userExists) {
      throw new Error("Erro ao Autenticar");
    }

    const passwordIsValid = compareSync(password, userExists.senha);
    if (!passwordIsValid) {
      throw new Error("Erro ao Autenticar");
    }

    const token = jwt.sign(
      { userId: userExists.id, email: userExists.email },
      jwtSecret,
      { expiresIn: "6h" }
    );

    return { token };
  }
}
