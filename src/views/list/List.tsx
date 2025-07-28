import { useGlobalComponents } from '../../components/GlobalProvider'
import { produce } from 'immer'
import { useReducer, useState } from 'react'
import './List.css'

type Types = 'add' | 'remove' | 'edit' | 'clear'
interface ActionType {
    type: Types,
    item?: number
}

export function ListWithState() {
    const [listItems, setListItems] = useState([1, 2, 3])
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

function listReducer(listItems: number[], action: ActionType) {
    switch (action.type) {
        case 'add':
            return produce(listItems, (draft) => {
                draft.push(Math.random())
            })
        case 'remove':
            return produce(listItems, (draft) => {
                const index = draft.findIndex((item) => item === action.item)
                if (index !== -1) draft.splice(index, 1)
            })
        case 'edit':
            return produce(listItems, (draft) => {
                const index = draft.findIndex((item) => item === 1)
                if (index !== -1) draft[index] = 9
            })
        case 'clear':
            return [] // 或者 return produce(listItems, draft => draft.splice(0, draft.length))
        default:
            return listItems
    }
}

export function List() {
    const [listItems, dispatch] = useReducer(listReducer, [1, 2, 3])
    const { Button } = useGlobalComponents()

    const handleAddList = () => {
        dispatch({
            type: 'add'
        })
    }

    const handleRemoveList = (deleteItem: number) => {
        console.log('remove', deleteItem)
        dispatch({
            type: 'remove',
            item: deleteItem
        })
    }

    const handleClearList = () => {
        console.log('clear')
        dispatch({
            type: 'clear'
        })
    }

    const handleEditList = () => {
        dispatch({
            type: 'edit'
        })
    }

    return (
        <>
            {listItems.map((item) => (
                <div key={item}>
                    {item}
                    <div key={item} className="button-group">
                        <Button
                            width="50px"
                            height="30px"
                            type="plain"
                            onClick={handleAddList}
                        >
                            添加+
                        </Button>
                        <Button
                            width="50px"
                            height="30px"
                            type="plain"
                            onClick={handleEditList}
                        >
                            编辑
                        </Button>
                        <Button
                            width="50px"
                            height="30px"
                            type="plain"
                            onClick={handleClearList}
                        >
                            清空
                        </Button>
                        <Button
                            width="50px"
                            height="30px"
                            type="plain"
                            onClick={() => handleRemoveList(item)}
                        >
                            删除
                        </Button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default List
