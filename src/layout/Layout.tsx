import { Outlet } from 'react-router-dom'
import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export function Layout() {
    return (
        <div className="layout">
            <Header />
            <Sidebar />
            {/* 二级路由 */}
            <main className="content">
                <Outlet />
            </main>
        </div>
    )
}
