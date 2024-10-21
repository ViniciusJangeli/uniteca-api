import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { genSaltSync, hashSync } from "bcryptjs";

export class CreateUserUseCase {
    async execute ({email, name, cpf, password}: CreateUserDTO): Promise<User>{

    const userAlreadyExists = await prisma.user.findUnique({
        where: {
            email,
            cpf
        }
    })

    if (userAlreadyExists) {
        console.log('usuário já existe')
    }

    const salt = genSaltSync(10);
    const passwordHashed = hashSync(password, salt);

    const user = await prisma.user.create({
    data: {
        email, 
        name, 
        cpf, 
        password: passwordHashed
    }})

    return user
    }
}