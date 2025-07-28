import { useGlobalComponents } from '../../components/GlobalProvider'
import { produce } from 'immer'
import { useState } from 'react'
import './List.css'

export function List() {
    const [listItems, setListItems] = useState([1,2,3])
    const { Button } = useGlobalComponents()

    const handleClick = () => {
        setListItems(
            produce((listItems) => {
                listItems.push(Math.random())
            })
        )
    }

    return (
        <>
            {listItems.map((item) => (
                <div key={item}>{item}</div>
            ))}
            <Button
                width="50px"
                height="30px"
                type="plain"
                onClick={handleClick}
            >
                添加+
            </Button>
        </>
    )
}

export default List
