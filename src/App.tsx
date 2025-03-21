import FilpCountdown from './components/flip-countdown';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Form, { IFormInput } from './components/form';
import { SubmitHandler } from 'react-hook-form';
import './App.less';
import GithubIcon from './components/github-icon/icon';

interface IinputValue {
  duration?: number
  targetDate?: Date
  type: "Day" | "Hour" | "Minute" | "Second"
}

const App = () => {
  const [inputValue, setInputValue] = useState<IinputValue>();
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setLoading(true)
    if (data.duration && (Number(data.duration) < 1000 || Number(data.duration) > 1000 * 60 * 60 * 24 * 99))
      return toast.error('Please enter a valid duration!')
    if (data.targetDate && isNaN(new Date(data.targetDate).getTime()))
      return toast.error('Please enter a valid target date!')
    setInputValue({
      duration: data.duration || undefined,
      targetDate: data.targetDate ? new Date(data.targetDate) : undefined,
      type: data.type
    })
  }

  useEffect(() => {
    if (inputValue) {
      setLoading(false)
    }
  }, [inputValue])

  return (
    <>
      <Toaster />
      <div className="relative min-h-screen bg-linear-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-50">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Decorative floating elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
              style={{
                backgroundColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`,
                width: `${Math.random() * 10 + 5}rem`,
                height: `${Math.random() * 10 + 5}rem`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        <div className="z-10 text-center flex flex-col items-center">
          <h1 className="title text-2xl sm:text-3xl md:text-4xl lg:text-6xl select-none hover:scale-105 transform duration-300
            font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-6">
            React-Flip-Countdown
          </h1>
          <div className="select-none text-sm sm:text-lg md:text-xl pb-6 md:pb-10 max-w-[75vw] hover:scale-105 transform duration-300">
            A simple and easy-to-use flipCountdown component for React 🥳.
          </div>
          <Form onSubmit={onSubmit} />
          <div className="">
            {loading ? <></> : <FilpCountdown
              duration={inputValue?.duration}
              targetDate={inputValue?.targetDate}
              type={inputValue?.type}
              onEnded={() => toast('Countdown ended!', {
                duration: 1500,
                icon: '👏',
                removeDelay: 1000,
              })} />}
          </div>
          <div className="text-sm text-gray-500 text-center mt-16 select-none hover:scale-105 transform duration-300">
            <span className="mr-2">Made with ❤️ by</span>
            <a href="https://github.com/HyaCiovo" target="_blank" className="hover:underline">
              <GithubIcon />
              <span className="text-blue-500 ml-2">HyaCiovo</span>
            </a>
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-blue-300 rounded-full opacity-50" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-300 rounded-lg animate-bounce opacity-50" />
        <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-yellow-300 rounded-full opacity-50" />
      </div>
    </>
  )
}

export default App
