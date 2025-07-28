import { ReactNode } from 'react'
import './Button.css'

export type ButtonType = 'primary' | 'plain'

export interface buttonProps {
    children: ReactNode
    color: string
    width: string | number
    height: string | number
    type: ButtonType
    onClick: (...args: any[]) => any
}

export type ButtonProps = Partial<buttonProps>

export function Button({
    children,
    color = '#333',
    width,
    height,
    type = 'plain',
    onClick = () => {}
}: ButtonProps) {
    return (
        <button
            className={`is-${type} button`}
            style={{
                color,
                width,
                height
            }}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
