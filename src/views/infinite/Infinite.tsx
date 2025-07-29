import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { throttle } from '../../utils'

export function Infinite() {
    const [list, setList] = useImmer([0])

    const addList = throttle(() => {
        setList((draft) => {
            draft.push(Math.floor(Math.random() * 10))
        })
    }, 500)

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log('inspect')
                addList()
            }
        })
    }, {
        threshold: 1
    })

    useEffect(() => {
        const guard = document.getElementById('guard')
        if (!guard) return
        observer.observe(guard)
        return () => {
            observer.disconnect()
        }
    })
    // if (!guard) return null

    return (
        <>
            <div className="infinite">
                Infinite List
                <ul className="list">
                    {list.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <span id="guard" style={{padding: '10px', backgroundColor: '#eee'}}>Loading...</span>
            </div>
        </>
    )
}

export default Infinite
