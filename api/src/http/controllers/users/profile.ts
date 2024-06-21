import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/lib/prisma'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const userData = await prisma.user.findUnique({
        where: {
            email: request.user.sub,
        },
    })

    const getUserProfile = makeGetUserProfileUseCase()

    const { user } = await getUserProfile.execute({
        // @ts-ignore: Object is possibly 'null'.
        // userId: request.user.sub,
        userId: userData.id,
    })

    return reply.status(200).send({
        user: {
            ...user,
            password_hash: undefined,
        },
    })
}
