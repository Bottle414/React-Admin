import { Outlet } from 'react-router-dom'
import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'
import './Layout.css'

export function Layout() {
    return (
        <div className="layout">
            <div className="layout-left">
                <Sidebar />
            </div>
            <div className="layout-right">
                <Header />
                {/* 二级路由 */}
                <main className="layout-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
