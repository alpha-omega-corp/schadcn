import type { Component, FunctionalComponent, HTMLAttributes, VNodeProps } from "vue"

interface RouteGroup {
    name: string
    icon?: FunctionalComponent<HTMLAttributes & VNodeProps> | string
    isActive?: boolean
    routes: Route[]
}

interface Route {
    name?: string
    path: string
    component: Component
    service: string
}

export type { RouteGroup, Route }

