import { useState, useImperativeHandle, forwardRef } from 'react'
import type {
    FlipCardHandleInterface,
    FlipCardPropsInterface,
} from './interfaces.ts'
import style from './index.module.less'
import clsx from 'clsx'

const FlipCard = (
    {
        // 初始前牌文字
        initFrontText = '0',
        // 初始后牌文字
        initBackText = '1',
        // 翻牌动画时间，与CSS中设置的animation-duration保持一致
        duration = 600,
    }: FlipCardPropsInterface,
    ref: React.Ref<FlipCardHandleInterface>
) => {
    // 是否正在翻转中
    const [isFlipping, setIsFlipping] = useState(false)
    // 翻转类型，down=向下翻转，up=向上翻转
    const [flipType, setFlipType] = useState('down')
    // 前牌文字
    const [frontText, setFrontText] = useState(initFrontText)
    // 后牌文字
    const [backText, setBackText] = useState(initBackText)

    // 翻转
    const flip = ({
        type,
        newFrontText,
        newBackText,
    }: {
        type: string
        newFrontText: string | number
        newBackText: string | number
    }) => {
        if (isFlipping) {
            return false
        }
        setFrontText(newFrontText)
        setBackText(newBackText)
        setFlipType(type)
        setIsFlipping(true)

        setTimeout(() => {
            setFrontText(newBackText)
            setIsFlipping(false)
        }, duration)
    }
    useImperativeHandle(ref, () => {
        return {
            // 下翻牌
            flipDown: (
                newFrontText: string | number,
                newBackText: string | number
            ) => {
                flip({ type: 'down', newFrontText, newBackText })
            },
            // 上翻牌
            flipUp: (
                newFrontText: string | number,
                newBackText: string | number
            ) => {
                flip({ type: 'up', newFrontText, newBackText })
            },
        }
    })

    return (
        <div
            className={clsx(style['flip-card'], style[flipType], isFlipping && style['go'],
                "text-3xl h-12 leading-12 w-7 rounded sm:text-4xl sm:h-15 sm:leading-15 sm:w-10 md:leading-20 md:h-20 md:rounded-md md:text-5xl md:w-12 lg:text-[66px] lg:h-25 lg:w-15 lg:leading-25 lg:rounded-[10px]"
            )}
        >
            <div className={clsx(style['digital'], style['front'], style[`number${frontText}`])} />
            <div className={clsx(style['digital'], style['back'], style[`number${backText}`])} />
        </div>
    )
}

export default forwardRef<FlipCardHandleInterface, FlipCardPropsInterface>(
    FlipCard
)