import router, { RoutesWithMeta } from '../../router'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export function Sidebar() {
    const secondryRoutes = router.routes[0].children
    if (!secondryRoutes) return null

    const renderSidebar = (routes: RoutesWithMeta) => {
        return routes.map((route) => (
            <div key={route.id || route.path}>
                <NavLink to={route.path || '/'}>{route.meta.title}</NavLink>
                {route.children && (
                    <div className="sidebar-children">
                        {renderSidebar(route.children as RoutesWithMeta)}
                    </div>
                )}
            </div>
        ))
    }

    return (
        <div className="sidebar">
            {renderSidebar(secondryRoutes as RoutesWithMeta)}
        </div>
    )
}
