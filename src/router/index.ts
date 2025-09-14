import {
    createRouter,
    createWebHistory,
    type NavigationGuardNext,
    type RouteLocationNormalized,
    type Router,
} from "vue-router";
import {routes} from "@/router/routes";
import {type Route} from "@/models/app/router.ts";

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

console.log(routes)

const setGuestPermissions = () => {
    sessionStorage.setItem('permissions', JSON.stringify({
        'guest.read': true,
    }))
}

const canUserAccess = (to: RouteLocationNormalized): boolean => {
    const permString = sessionStorage.getItem('permissions')

    if (permString) {
        const permissions = JSON.parse(permString)
        const filteredRoutes: Route[] = routes.filter((r: Route) => {
            return r.path === to.path
        })

        const route: Route = filteredRoutes[0]

        if (route) {
            const service: string = route.service
            if (service === 'guest') {
                return true
            }

            const canAccess = permissions[`${service}.read`]
            if (canAccess === undefined || !canAccess) {
                return false
            }
        }
    } else {
        setGuestPermissions()
    }

    return true
}

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (canUserAccess(to)) {
        next()
    }

    console.log(from)
})

export default router