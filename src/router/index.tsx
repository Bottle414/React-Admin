import { createBrowserRouter } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Layout } from "../layout/Layout"

// 懒加载组件
const Home = lazy(() => import('../views/home/Home'))
const About = lazy(() => import('../views/about/About'))
const Login = lazy(() => import('../views/login/Login'))

// 路由配置
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'about',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <About />
                    </Suspense>
                )
            }
        ]
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Login />
            </Suspense>
        )
    }
])

export default router
