import { useRef, useState } from "react";
import Header from "../pages/Header";
import { addTask } from "../../utils/http";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FetchActions } from "../../store";
import { DatePicker } from "zaman";
import { calender } from "../UI/UI";

export default function AddTask() {
     const [chosenStatus, setChosenStatus] = useState('not-done');
     const [chosenTimeValue, setChosenTimeValue] = useState();
     const [nameErrClass, setNameErrClass] = useState();
     const [timeErrClass, setTimeErrClass] = useState();
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const chosenName = useRef();

     let hasError;

     async function submitHandler(event) {
          hasError = false;
          event.preventDefault();

          // validation
          if (chosenName.current.value == '') {
               setNameErrClass('bg-red-100 border border-red-300');
               hasError = true;
          } else {
               setNameErrClass();
          }
          if (!chosenTimeValue) {
               setTimeErrClass('bg-red-100 border border-red-300');
               hasError = true;
          } else {
               setTimeErrClass();
          }

          if (!hasError) {
               const body = JSON.stringify({
                    name: chosenName.current.value,
                    status: chosenStatus,
                    time: chosenTimeValue
               });
               const options = {
                    headers: {
                         'Content-Type': 'application/json',
                    }
               }
               const result = await addTask(body, options);
               if (result) {
                    dispatch(FetchActions.setFetcherResolcer());
                    navigate('/');
               }
          }
     }

     function chosenStatusChangeHandler(status) {
          setChosenStatus(status);
     }

     function chosenTimeChange(value) {
          setChosenTimeValue(value.value);
     }

     return (
          <>
               <Header>
                    <h1 className="font-bold text-xl my-2">افزودن وظیفه جدید</h1>
                    <form onSubmit={submitHandler} className=" w-full flex flex-col gap-4">
                         <div className="flex flex-col md:flex-row md:items-center gap-4 my-2">
                              <label htmlFor="name" className="font-bold w-16">عنوان : </label>
                              <div className="flex flex-col items-ceter gap-2 w-full">
                                   <input type="text" name="name" ref={chosenName} className={`w-full md:w-2/3 border rounded-md px-2 py-1 h-10
                                    bg-gray-100 black-light-shadow focus:outline-none ${nameErrClass}`} placeholder="عنوان وظیفه" />
                                   {
                                        nameErrClass &&
                                        <span className="text-red-200 text-sm"> لطفا عنوان وظیفه را وارد کنید </span>
                                   }
                              </div>
                         </div>
                         <hr />
                         <div className="flex flex-col md:flex-row gap-2 my-2">
                              <label htmlFor="status" className="font-bold">وضعیت : </label>
                              <div className="flex flex-col md:flex-row gap-2">
                                   <div className="flex gap-3">
                                        <input type="radio" name="status" className="cursor-pointer" onChange={() => chosenStatusChangeHandler('not-done')}
                                             checked={chosenStatus === 'not-done'} />
                                        <span className="cursor-pointer">انجام نشده</span>

                                   </div>
                                   <div className="flex gap-3">
                                        <input type="radio" name="status" className="cursor-pointer" onChange={() => chosenStatusChangeHandler('done')}
                                             checked={chosenStatus === 'done'} />
                                        <span className="cursor-pointer">انجام شده</span>
                                   </div>
                                   <div className="flex gap-3">
                                        <input type="radio" name="status" className="cursor-pointer" onChange={() => chosenStatusChangeHandler('doing')}
                                             checked={chosenStatus === 'doing'} />
                                        <span className="cursor-pointer">در حال انجام</span>

                                   </div>
                              </div>
                         </div>
                         <hr />
                         <div className="flex flex-col md:flex-row gap-2 my-2">
                              <label htmlFor="time" className="font-bold w-20">زمان : </label>
                              <div className="w-full flex flex-col gap-2">
                                   <div className={`bg-gray-100 flex gap-5 w-full md:w-2/3 rounded-md black-light-shadow border-spacing-2
                                    border-red-900 p-2 ${timeErrClass}`}>
                                        <span>{calender}</span>
                                        <DatePicker onChange={(value) => chosenTimeChange(value)} inputClass="w-full" />
                                   </div>
                                   {
                                        timeErrClass &&
                                        <span className="text-red-200 text-sm"> لطفا زمان وظیفه را وارد کنید </span>
                                   }
                              </div>
                         </div>

                         <div className="w-full flex-center">
                              <button type="submit" className="btn-green w-2/3">افزودن</button>
                         </div>
                    </form>
               </Header>
          </>
     );
}

