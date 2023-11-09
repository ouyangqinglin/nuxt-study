import {abortNavigation, navigateTo} from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')
    if (!token.value) {
        if (to.path === '/login') abortNavigation()
        else return navigateTo(`/login?redirect=${to.fullPath}`)
    } else {
        if (to.path === '/login') return navigateTo('/')
    }
})