import { Usuario } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { genSaltSync, hashSync } from "bcryptjs";

export class CreateUserUseCase {
    async execute ({email, senha, nome, cpf, telefone}: CreateUserDTO): Promise<Usuario>{

    const userAlreadyExists = await prisma.usuario.findUnique({
        where: {
            email,
            cpf
        }
    })

    if (userAlreadyExists) {
        console.log('usuário já existe')
    }

    const salt = genSaltSync(10);
    const passwordHashed = hashSync(senha, salt);

    const user = await prisma.usuario.create({
    data: {
        email, 
        nome, 
        cpf, 
        senha: passwordHashed,
        telefone
    }})

    return user
    }
}