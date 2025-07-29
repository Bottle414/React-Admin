import { useCallback, useEffect, useRef } from 'react'
import { useImmer } from 'use-immer'
import { debounce } from '../../utils'

/**
 * IntersectionObserver 其实只在出现与不出现切换的时候才触发
 * 这里一直在视口内却依旧触发了，是组件重新渲染导致重建了 observer
 * 节流误用为防抖时，useCallback 使 addList 一直是同一个函数，计数器是正常工作的，导致 addList 一直无法触发，于是视图不再刷新。此时隔开防抖的时间在 vscode 按保存，导致组件刷新，于是 addList 就触发了，所以按一下保存才会刷新一次。而没有 useCallback 包起来时，一直创建新的实例，就导致防抖失效了，所以可以一直触发 addList，导致无限滚动的假象
 * 不对，我弄反了，这里应该是节流的。写成防抖了，防抖因为延迟触发 addList 倒是可行，节流没赶上监控所以没触发……两次监控之间的间隔在 10 ~ 20ms，笑死了
 * 那还是将错就错，造成无限滚动的假象吧
 * 不过，在初始就有滚动条的情况下， throttle 才是正解，用户抽风那他会再刷一次的，不用操心
 */

export function Infinite() {
    const [list, setList] = useImmer([0])
    const guardRef = useRef<HTMLSpanElement| null>(null)

    const addList = useCallback(debounce(() => {
        setList((draft) => {
            draft.push(Math.floor(Math.random() * 10))
        })
    }, 500),[])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    addList()
                }
            })
        }, {
            threshold: 1
        })
        
        if (guardRef.current) {
            observer.observe(guardRef.current)
        }
        return () => {
            observer.disconnect()
        }
    },[list])

    return (
        <>
            <div className="infinite">
                Infinite List
                <ul className="list">
                    {list.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <span id="guard" ref={guardRef} style={{padding: '10px', backgroundColor: '#eee'}}>Loading...</span>
            </div>
        </>
    )
}

export default Infinite
