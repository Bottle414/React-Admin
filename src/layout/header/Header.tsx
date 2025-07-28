import './Header.css'
import { useRouteLoaderData } from 'react-router-dom'
import router, { RouteWithMeta } from '../../router'

export function Header() {
    const getCurrentRoute = () => {
        const sencondryRoutes = router.routes[0].children
        if (!sencondryRoutes) return
        return sencondryRoutes.find(
            (route) => !!useRouteLoaderData(route.id as string)
        )
    }

    const getCurrentTitle = () => {
        const currentRoute = getCurrentRoute()
        if (!currentRoute) return null
        return (currentRoute as RouteWithMeta).meta.title
    }

    return <div className="header">{getCurrentTitle()}</div>
}
