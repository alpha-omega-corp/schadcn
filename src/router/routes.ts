import {type Route, type RouteGroup} from '@/models/app/router.ts';
import {HomeIcon, UserCogIcon} from "lucide-vue-next";

const resolveComponent = (component: string, dir?: string) => {
    return (): Promise<unknown> => dir === undefined
        ? import(`@/views/${component}.vue`)
        : import(`@/views/${dir}/${component}.vue`)
}

export const guestRoutes: Route[] = [
    {
        name: "Home",
        icon: HomeIcon,
        routes: [
            {
                path: "/",
                component: resolveComponent("HomePage"),
                meta: {layout: 'GuestLayout'},
                service: 'guest'
            },

        ]
    },
]


export const userRoutes: RouteGroup[] = [
    {
        name: "Players",
        icon: UserCogIcon,
        routes: [
            {
                path: '/players',
                component: resolveComponent('PlayersPage', 'user'),
                meta: {layout: 'UserLayout'},
                service: 'guest',
            },
        ],
    },
    {
        name: "Layouts",
        icon: UserCogIcon,
        routes: [
            {
                path: '/layouts',
                component: resolveComponent('LayoutsPage', 'user'),
                meta: {layout: 'UserLayout'},
                service: 'guest',
            },
        ],
    },
    {
        name: "Settings",
        icon: UserCogIcon,
        routes: [
            {
                path: '/settings',
                component: resolveComponent('SettingsPage', 'user'),
                meta: {layout: 'UserLayout'},
                service: 'guest',
            },
        ],
    },
]

export const managementRoutes: Route[] = [
    {
        name: "Game Scheduling",
        icon: UserCogIcon,
        routes: [
            {
                path: '/games',
                component: resolveComponent('GamesPage', 'user'),
                meta: {layout: 'UserLayout'},
                service: 'guest',
            },
        ],
    },
    {
        name: "Training Milestones",
        icon: UserCogIcon,
        routes: [
            {
                path: '/games',
                component: resolveComponent('GamesPage', 'user'),
                meta: {layout: 'UserLayout'},
                service: 'guest',
            },
        ],
    },
]

const standaloneRoutes: Route[] = [
    {
        path: '/login',
        component: resolveComponent('LoginPage'),
        meta: {layout: 'GuestLayout'},
        service: 'guest'
    }
]


export const routes: Route[] = [
    ...standaloneRoutes,
    ...userRoutes.flatMap(rg => {
        return rg.routes
    }),
    ...managementRoutes.flatMap(rg => {
        return rg.routes
    }),
    ...guestRoutes.flatMap(rg => {
        return rg.routes
    })
]
