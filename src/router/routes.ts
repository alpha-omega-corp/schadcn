import {type Route, type RouteGroup} from '@/models/app/router.ts';
import {ActivityIcon, HomeIcon, KanbanIcon, UserCogIcon} from "lucide-vue-next";

const resolveComponent = (component: string, dir?: string) => {
    return (): Promise<unknown> => dir === undefined
        ? import(`@/views/${component}.vue`)
        : import(`@/views/${dir}/${component}.vue`)
}


export const routeGroups: RouteGroup[] = [
    {
        name: "Welcome",
        icon: HomeIcon,
        routes: [
            {
                name: "Home",
                path: "/",
                component: resolveComponent("HomePage"),
                meta: {layout: 'GuestLayout'},
                service: 'guest'
            },

        ]
    },
    {
        name: "Team",
        icon: KanbanIcon,
        routes: [
            {
                name: "Team Settings",
                path: '/team/settings',
                component: resolveComponent('TeamSettingsPage', 'user'),
                meta: {layout: 'UserLayout'},
                service: 'guest',
            },
            {
                name: "Team Layout",
                path: '/team/layout',
                component: resolveComponent('TeamLayoutPage', 'user'),
                service: 'guest',
            },
        ],
    },
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
        name: "Training",
        icon: ActivityIcon,
        routes: [
            {
                path: '/players',
                component: resolveComponent('PlayersPage', 'user'),
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
    ...routeGroups.flatMap(rg => {
        return rg.routes
    })
]
