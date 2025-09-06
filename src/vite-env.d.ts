/// <reference types="vite/client" />

import {type Environment} from "@/models/app/environment.ts";

export const environment: Environment = import.meta.env

export function getCookies() {
    const documentCookies = Object.create({})
    if (!document.cookie) return documentCookies

    document.cookie.split(";").forEach((v: string): void => {
        const cSplit: string[] = v.split("=")
        documentCookies[cSplit[0] ?? cSplit[0].trim()] = cSplit[1] ?? cSplit[1].trim()
    })

    return documentCookies
}

