import {type Route, type RouteGroup} from '@/models/app/router.ts';
import {ActivityIcon, KanbanIcon, UserCogIcon} from "lucide-vue-next";

const resolveComponent = (component: string, dir?: string) => {
    return (): Promise<unknown> => dir === undefined
        ? import(`@/views/${component}.vue`)
        : import(`@/views/${dir}/${component}.vue`)
}

export const routeGroups: RouteGroup[] = [
    {
        name: "Team",
        icon: KanbanIcon,
        routes: [
            {
                name: "Team Settings",
                path: '/team/settings',
                component: resolveComponent('TeamSettingsPage'),
                service: 'guest',
            },
            {
                name: "Team Layout",
                path: '/team/layout',
                component: resolveComponent('TeamLayoutPage'),
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
                component: resolveComponent('PlayersPage'),
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
                component: resolveComponent('PlayersPage'),
                service: 'guest',
            },
        ],
    },
]

export const routes: Route[] = routeGroups.flatMap(rg => {
    return rg.routes
})