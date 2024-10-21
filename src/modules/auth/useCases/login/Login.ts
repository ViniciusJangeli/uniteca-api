import { prisma } from "../../../../prisma/client";
import { LoginDTO } from "../../dtos/Login";
import { compareSync } from "bcryptjs";

export class Login {
    async execute({login, password}: LoginDTO) {
        const userExists = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: login },
                    { cpf: login }
                ]
            }
        });

        if (userExists) {
            const passwordIsValid = compareSync(password, userExists.password);

            if (passwordIsValid) {
                return console.log('Login efetuado');
            } else {
                return console.log('Senha incorreta');
            }
        } else {
            console.log('Usuário não existe');
        }
    }
}
