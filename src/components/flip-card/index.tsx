import { useState, useImperativeHandle, forwardRef } from 'react'
import type {
    FlipCardHandleInterface,
    FlipCardPropsInterface,
} from './interfaces.ts'
import style from './index.module.less'
import clsx from 'clsx'

/**
 * FlipCard 组件是一个用于实现翻牌动画的 React 函数组件。
 * 它支持上下翻转动画，并允许通过 ref 调用翻转方法。
 *
 * @param {FlipCardPropsInterface} props - 组件的属性对象。
 *   - initFrontText: 初始前牌文字，默认值为 '0'。
 *   - initBackText: 初始后牌文字，默认值为 '1'。
 *   - duration: 翻牌动画的持续时间（毫秒），需与 CSS 中的 animation-duration 保持一致，默认值为 600。
 * @param {React.Ref<FlipCardHandleInterface>} ref - 通过 React.forwardRef 提供的 ref，用于暴露组件的方法。
 * 
 * @returns {JSX.Element} 返回一个包含翻牌动画的 JSX 元素。
 */
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

    /**
     * 执行翻转动画的核心逻辑。
     * 根据传入的参数更新前后牌文字、翻转类型，并触发动画。
     * 如果当前正在翻转，则忽略新的翻转请求。
     *
     * @param {Object} params - 翻转参数对象。
     *   - type: 翻转类型，'down' 表示向下翻转，'up' 表示向上翻转。
     *   - newFrontText: 新的前牌文字。
     *   - newBackText: 新的后牌文字。
     */
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

    /**
     * 使用 useImperativeHandle 暴露组件的翻转方法给父组件。
     * 提供了两个方法：flipDown 和 flipUp，分别用于向下和向上翻转。
     */
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
            {/* 前牌 */}
            <div className={clsx(`number`,style['digital'], style['front'])}
                data-number={`${frontText}`} />
            {/* 后牌 */}
            <div className={clsx(`number`,style['digital'], style['back'])}
                data-number={`${backText}`} />
        </div>
    )
}

export default forwardRef<FlipCardHandleInterface, FlipCardPropsInterface>(
    FlipCard
)