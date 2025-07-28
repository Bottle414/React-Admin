import { useGlobalComponents } from '../../components/GlobalProvider'
import { produce } from 'immer'
import { useReducer, useState } from 'react'
import { useImmer, useImmerReducer } from 'use-immer'
import './List.css'

type Types = 'add' | 'remove' | 'edit' | 'clear'
interface ActionType {
    type: Types
    item?: number
}

// hook 不能在组件外使用
// const { Button } = useGlobalComponents()

/**
 * immer + state
 */
export function ListWithState() {
    const { Button } = useGlobalComponents()
    const [listItems, setListItems] = useState([1, 2, 3])

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

/**
 * use-immer + state
 */
export function ListWithImmerState() {
    const [listItems, setListItems] = useImmer([1, 2, 3])
    const { Button } = useGlobalComponents()

    const handleClick = () => {
        setListItems((draft) => {
            draft.push(Math.random())
        })
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

/**
 * immer + reducer
 */
function listReducer(listItems: number[], action: ActionType) {
    switch (action.type) {
        case 'add':
            return produce(listItems, (draft) => {
                draft.push(action.item || 0)
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

/**
 * use-immer + reducer
 */
function listImmerReducer(draft: number[], action: ActionType) {
    switch (action.type) {
        case 'add':
            draft.push(action.item)
            break
        case 'remove':
            const removeIndex = draft.findIndex((item) => item === action.item)
            if (removeIndex !== -1) draft.splice(removeIndex, 1)
            break
        case 'edit':
            const index = draft.findIndex((item) => item === 1)
            if (index !== -1) draft[index] = 9
            break
        case 'clear':
            return [] // 或者 return produce(listItems, draft => draft.splice(0, draft.length))
        default:
            return draft
    }
}

export function List() {
    // immer 版本 reducer
    // const [listItems, dispatch] = useReducer(listReducer, [1, 2, 3])

    // use-immer 版本 reducer
    const [listItems, dispatch] = useImmerReducer(listImmerReducer, [1, 2, 3])

    const { Button } = useGlobalComponents()

    const [text, setText] = useState(0)

    const handleAddList = (addItem: number) => {
        dispatch({
            type: 'add',
            item: addItem
        })

        setText(0)
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
                            onClick={handleEditList}
                        >
                            编辑
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
            <div
                className="common-group"
                style={{
                    marginTop: '40px'
                }}
            >
                <input
                    type="number"
                    placeholder="Please Input..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button
                    width="50px"
                    height="30px"
                    type="plain"
                    onClick={() => handleAddList(text)}
                >
                    添加+
                </Button>
                <Button
                    width="50px"
                    height="30px"
                    type="plain"
                    onClick={handleClearList}
                >
                    清空
                </Button>
            </div>
        </>
    )
}

export default List
