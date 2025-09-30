import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";

interface Player {
    id: number
    firstName: string
    lastName: string
    number: number
    height: number
    weight: number
    isActive: boolean
    avatar: string
    birthDate: number
    createdAt: number
    updatedAt: number
}

export const PlayerSchema = toTypedSchema<Player>(z.object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    birthDate: z.number()
}))

export type {Player}
