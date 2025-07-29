import { ReactNode, useRef, useState } from 'react'

interface KeepAliveProps {
    activeKey: string
    childrenMap: Record<string, ReactNode>
}

export function KeepAlive({ activeKey, childrenMap }: KeepAliveProps) {
    const cacheRef = useRef<Map<string, ReactNode>>(new Map())
    const [_, forceUpdate] = useState(0)

    // 将未缓存的组件加入缓存
    Object.entries(childrenMap).forEach(([key, node]) => {
        if (!cacheRef.current.has(key)) {
            cacheRef.current.set(key, node)
            forceUpdate((v) => v + 1) // 强制刷新以展示新组件
        }
    })

    return (
        <>
            {[...cacheRef.current.entries()].map(([key, node]) => (
                <div
                    key={key}
                    style={{ display: key === activeKey ? 'block' : 'none' }}
                >
                    {node}
                </div>
            ))}
        </>
    )
}

export default KeepAlive