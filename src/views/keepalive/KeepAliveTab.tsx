import { useState } from 'react'
import KeepAlive from './KeepAlive'

function Tab1() {
    console.log('refresh1')
    const [count, setCount] = useState(3)
    return (<>
        <div>我是第一个 Tab 内容</div>
        <div>现在计数: { count }</div>
        <button onClick={() => {setCount(count + 1)}}>点我 +1</button>
    </>)
}

function Tab2() {
    console.log('refresh2')
    return <div>我是第二个 Tab 内容</div>
}

function Tab3() {
    console.log('refresh3')
    const [count, setCount] = useState(0)
    return (<>
        <div>我是第三个 Tab 内容</div>
        <div>现在计数: { count }</div>
        <button onClick={() => {setCount(count + 1)}}>点我 +1</button>
    </>)
}

export function KeepAliveTab() {
    const [active, setActive] = useState('tab1')

    return (
        <>
            <button onClick={() => {setActive('tab1')}}>tab1</button>
            <button onClick={() => {setActive('tab2')}}>tab2</button>
            <button onClick={() => {setActive('tab3')}}>tab3</button>
            <KeepAlive
                activeKey={active}
                childrenMap={{
                    tab1: <Tab1 />,
                    tab2: <Tab2 />,
                    tab3: <Tab3 />
                }}
            />
        </>
    )
}

export default KeepAliveTab
