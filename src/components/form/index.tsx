import dayjs from "dayjs";
import { useForm } from "react-hook-form";

export interface IFormInput {
  duration: number
  targetDate: string
  type:  "Day" | "Hour" | "Minute" | "Second"
}

const Form = ({ onSubmit }: any) => {
  const { register, handleSubmit } = useForm<IFormInput>()

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 text-sm sm:text-base">
        <div className="w-full md:w-1/3 px-3 mb-2 md:mb-4">
          <label className="text-left block tracking-wide text-gray-700 font-bold mb-2">
            Duration (ms)
          </label>
          <input
            {...register("duration")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded md:rounded-[10px] py-2 px-2 md:py-3 md:px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
            placeholder={`${1000 * 60 * 5}`} />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-2 md:mb-4">
          <label className="text-left block tracking-wide text-gray-700 font-bold mb-2">
            TargetDate
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded md:rounded-[10px] py-2 px-2 md:py-3 md:px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
            {...register("targetDate")}
            placeholder={dayjs().add(5, 'minute').format("YYYY-MM-DD HH:mm:ss")} />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-2 md:mb-4">
          <label className="text-left block tracking-wide text-gray-700 font-bold mb-2">
            Type
          </label>
          <div className="relative">
            <select {...register("type")} className="block cursor-pointer appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 md:py-3 md:px-4 pr-8 rounded md:rounded-[10px] leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option>Day</option>
              <option>Hour</option>
              <option>Minute</option>
              <option>Second</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
      </div>
      <button className="font-semibold bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 
            hover:to-purple-600 text-white py-2 px-4 rounded w-full md:max-w-1/2 my-4 mb-8 md:my-8 sm:my-2 md:rounded-[10px] cursor-pointer
            shadow-lg"
        type="submit">
        Rerender the countdown demo
      </button>
    </form>
  );
};

export default Form;