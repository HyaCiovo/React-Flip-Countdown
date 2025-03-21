import { useEffect, useMemo, useRef } from 'react';
import FlipCard from '../flip-card/index.tsx';
import type { FlipCardHandleInterface } from '../flip-card/interfaces.ts';
import type { FlipCountdownInterface } from './interface.ts';
import style from './index.module.less';
import clsx from 'clsx';
/**
 * 将给定的毫秒数转换为格式化的时间字符串
 * 此函数将毫秒数转换为天、小时、分钟和秒，并以格式化的字符串形式返回
 * 每个时间单位前都会补零以确保至少两位数的显示效果
 * 
 * @param ms {number} 需要格式化的毫秒数
 * @returns {string} 格式化后的时间字符串，格式为"秒分时天"
 */
const formatRemaining = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  // 秒
  const seconds = totalSeconds % 60;
  // 分钟
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  // 小时
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  // 天
  const days = Math.floor(totalSeconds / 86400);
  // 将每个时间单位转换为字符串，并确保至少两位数，然后拼接成一个字符串返回
  return [seconds, minutes, hours, days].map(n => String(n).padStart(2, '0')).join('');
}
/**
 * FlipCountdown 是一个用于显示翻转倒计时的组件
 * 它根据给定的 duration 或 targetDate 计算倒计时，并在倒计时结束时调用 onEnded 回调
 * 
 * @attention duration / targetDate 同时只能有一个属性生效，当两个属性都传值时，以 targetDate 为准。都不传时，默认倒计时 5 分钟。
 * 
 * @param {number} props.duration - 倒计时的持续时间（以毫秒为单位）
 * @param {string} props.type - 倒计时的类型，默认为'Day'
 * @param {Date} props.targetDate - 目标时刻
 * @param {Function} props.onEnded - 倒计时结束时的回调函数
 */
const FilpCountdown = (props: FlipCountdownInterface) => {
  console.log('FilpCountdown props', props)
  // 解构组件属性，设置默认值
  const {
    duration,
    type = 'Day',
    targetDate,
    onEnded,
  } = props;

  // 根据duration计算结束时刻，如果未设置duration，则使用targetDate
  const endedDate = useMemo(() =>
    targetDate || new Date(new Date().getTime() + (duration || 1000 * 60 * 5))
    , [duration, targetDate])

  // 计算初始的倒计时时间字符串
  const initNowTimeStr = useMemo(() => formatRemaining(
    Math.max(endedDate.getTime() - new Date().getTime(), 0)
  ), [endedDate])

  // 使用 useRef 钩子创建一个计时器引用，用于控制倒计时
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  // 创建翻转卡片的引用，用于后续更新倒计时显示
  const flipCardDay1Ref = useRef<FlipCardHandleInterface | null>(null)
  const flipCardDay2Ref = useRef<FlipCardHandleInterface | null>(null)
  const flipCardHour1Ref = useRef<FlipCardHandleInterface | null>(null)
  const flipCardHour2Ref = useRef<FlipCardHandleInterface | null>(null)
  const flipCardMinute1Ref = useRef<FlipCardHandleInterface | null>(null)
  const flipCardMinute2Ref = useRef<FlipCardHandleInterface | null>(null)
  const flipCardSecond1Ref = useRef<FlipCardHandleInterface | null>(null)
  const flipCardSecond2Ref = useRef<FlipCardHandleInterface | null>(null)

  // 将所有翻转卡片引用收集到一个数组中，以便统一管理
  const flipCards = [
    flipCardSecond1Ref,
    flipCardSecond2Ref,
    flipCardMinute1Ref,
    flipCardMinute2Ref,
    flipCardHour1Ref,
    flipCardHour2Ref,
    flipCardDay1Ref,
    flipCardDay2Ref
  ]

  // 使用 useEffect 钩子设置倒计时更新逻辑
  useEffect(() => {
    // 定义更新倒计时的函数
    const updateTimer = () => {
      const diff = endedDate.getTime() - new Date().getTime();

      // 如果倒计时结束，调用onEnded回调并清除计时器
      if (diff <= 0) {
        onEnded && onEnded();
        timer.current && clearInterval(timer.current);
        return;
      }

      // 格式化当前倒计时时间，并与上一秒的时间进行比较，更新翻转卡片
      const newTimeStr = formatRemaining(diff);
      const oldTimeStr = formatRemaining(diff + 1000); // 获取上一秒的时间
      for (let i = 0; i < flipCards.length; i++) {
        if (oldTimeStr[i] === newTimeStr[i])
          continue;
        flipCards[i].current?.flipDown(oldTimeStr[i], newTimeStr[i]);
      }
    }
    // 设置每秒更新一次倒计时，并立即更新一次
    timer.current = setInterval(updateTimer, 1000);
    updateTimer();

    // 组件卸载时清除计时器
    return () => {
      timer.current && clearInterval(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endedDate])

  // 渲染翻牌倒计时组件
  return (
    <div className={clsx(style['flip-countdown'],
      "flex items-center text-2xl leading-[42px] sm:leading-[62px] sm:text-4xl md:leading-[82px] md:text-5xl lg:leading-[102px] lg:text-[66px]")}>
      {['Day'].includes(type) && <>
        <FlipCard ref={flipCardDay1Ref} initFrontText={initNowTimeStr[6]} />
        <FlipCard ref={flipCardDay2Ref} initFrontText={initNowTimeStr[7]} />
        <em className='mr-1 md:mr-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl'>day</em>
      </>}
      {['Day', 'Hour'].includes(type) && <>
        <FlipCard ref={flipCardHour1Ref} initFrontText={initNowTimeStr[4]} />
        <FlipCard ref={flipCardHour2Ref} initFrontText={initNowTimeStr[5]} />
        <em>:</em>
      </>}
      {['Day', 'Hour', 'Minute'].includes(type) && <>
        <FlipCard ref={flipCardMinute1Ref} initFrontText={initNowTimeStr[2]} />
        <FlipCard ref={flipCardMinute2Ref} initFrontText={initNowTimeStr[3]} />
        <em>:</em>
      </>}
      {['Day', 'Hour', 'Minute', 'Second'].includes(type) && <>
        <FlipCard ref={flipCardSecond1Ref} initFrontText={initNowTimeStr[0]} />
        <FlipCard ref={flipCardSecond2Ref} initFrontText={initNowTimeStr[1]} />
      </>}
    </div>
  )
}

export default FilpCountdown;