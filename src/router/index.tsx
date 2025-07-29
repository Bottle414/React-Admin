import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { lazy, ReactElement, Suspense } from 'react'
import { Layout } from '../layout/Layout'
import { Loading } from '../components/loading/Loading'

// 懒加载组件
const Home = lazy(() => import('../views/home/Home'))
const About = lazy(() => import('../views/about/About'))
const Login = lazy(() => import('../views/login/Login'))
const List = lazy(() => import('../views/list/List'))
const Infinite = lazy(() => import('../views/infinite/Infinite'))
const KeepAliveTab = lazy(() => import('../views/keepalive/KeepAliveTab'))

// 路由元信息
export interface RouteMeta {
    name: string
    title: string
    requireAuth: false
}

export interface RouteWithMeta {
    index?: boolean
    path?: string
    element: ReactElement<any, any>
    id: string
    loader: () => object
    meta: RouteMeta
    children?: RoutesWithMeta
}

export type RoutesWithMeta = RouteWithMeta[]

const routesWithMeta: RoutesWithMeta = [
    {
        path: '/',
        element: <Layout />,
        id: 'layout',
        loader: () => ({
            name: 'layout',
            title: '布局'
        }),
        meta: {
            name: 'layout',
            title: '布局',
            requireAuth: false
        },
        children: [
            {
                index: true,
                id: 'home',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Home />
                    </Suspense>
                ),
                loader: () => ({
                    name: 'home',
                    title: '首页'
                }),
                meta: {
                    name: 'home',
                    title: '首页',
                    requireAuth: false
                }
            },
            {
                path: 'about',
                id: 'about',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <About />
                    </Suspense>
                ),
                loader: () => ({
                    name: 'about',
                    title: '关于'
                }),
                meta: {
                    name: 'about',
                    title: '关于',
                    requireAuth: false
                }
            },
            {
                path: 'list',
                id: 'list',
                element: (
                    <Suspense fallback={<Loading />}>
                        <List />
                    </Suspense>
                ),
                loader: () => ({
                    name: 'list',
                    title: '列表'
                }),
                meta: {
                    name: 'list',
                    title: '列表',
                    requireAuth: false
                }
            },
            {
                path: 'infinite',
                id: 'infinite',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Infinite />
                    </Suspense>
                ),
                loader: () => ({
                    name: 'infinite',
                    title: '无限滚动'
                }),
                meta: {
                    name: 'infinite',
                    title: '无限滚动',
                    requireAuth: false
                }
            },
            {
                path: 'keepalive',
                id: 'keepalive',
                element: (
                    <Suspense fallback={<Loading />}>
                        <KeepAliveTab />
                    </Suspense>
                ),
                loader: () => ({
                    name: 'keepalive',
                    title: '缓存组件'
                }),
                meta: {
                    name: 'keepalive',
                    title: '缓存组件',
                    requireAuth: false
                }
            }
        ]
    },
    {
        path: '/login',
        id: 'login',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Login />
            </Suspense>
        ),
        loader: () => ({
            name: 'login',
            title: '登录'
        }),
        meta: {
            name: 'login',
            title: '登录',
            requireAuth: false
        }
    }
]

// 路由配置
const router = createBrowserRouter(routesWithMeta as RouteObject[])

export default router
