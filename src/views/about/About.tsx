import { useState } from 'react'
import { useGlobalComponents } from '../../components/GlobalProvider'

function About() {
    const [isEditing, setIsEditing] = useState(false)
    const [task, setTask] = useState('')

    const { Button } = useGlobalComponents()

    return (
        <>
            {isEditing ? (
                <input
                    value={task}
                    onChange={(e) => {
                        setTask(e.target.value)
                    }}
                />
            ) : (
                <>{task}</>
            )}
            <Button
                onClick={() => {
                    setIsEditing(!isEditing)
                }}
            >
                {isEditing ? '保存' : '编辑'}
            </Button>
        </>
    )
}

export default About
