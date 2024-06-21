import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
    findById(id: number): Promise<CheckIn | null>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findManyByUserId(userId: number, page: number): Promise<CheckIn[]>
    countByUserId(userId: number): Promise<number>
    findByUserIdOnDate(userId: number, date: Date): Promise<CheckIn | null>
    save(checkIn: CheckIn): Promise<CheckIn>
}
