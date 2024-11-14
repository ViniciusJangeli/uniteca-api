import { prisma } from "../../../../prisma/client";
import { LoginDTO } from "../../dtos/Login";
import { compareSync } from "bcryptjs";
import jwt from 'jsonwebtoken';

const jwtSecret = String(process.env.JWT_SECRET)
export class Login {
    async execute({login, password}: LoginDTO) {
        const userExists = await prisma.usuario.findFirst({
            where: {
                OR: [
                    { email: login },
                    { cpf: login }
                ]
            }
        });

        if (userExists) {
            const passwordIsValid = compareSync(password, userExists.senha);

            if (passwordIsValid) {
                const token = jwt.sign(
                    { userId: userExists.id, email: userExists.email },
                    jwtSecret,
                    { expiresIn: '6h' }
                );

                return { token };
            } else {
                return { error: 'Seu CPF/e-mail e/ou senha estão incorretos!' };
            }
        } else {
            return { error: 'Seu CPF/e-mail e/ou senha estão incorretos!' };
        }
    }
}
