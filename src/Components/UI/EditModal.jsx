import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { calender, iconDel } from "./UI";
import { useDispatch, useSelector } from "react-redux";
import { FetchActions, ModalActions } from "../../store";
import { updateTask } from "../../utils/http";
import { DatePicker } from "zaman";

export default function EditModal() {

     const task = useSelector((state) => state.Modal.task);
     const modalStatus = useSelector((state) => state.Modal.status)
     const dispatch = useDispatch();

     const chosenName = useRef();

     const [chosenTimeValue, setChosenTimeValue] = useState(task.time);
     const [timeErrClass, setTimeErrClass] = useState();
     const [nameErrClass, setNameErrClass] = useState();
     const [chosenStatus, setChosenStatus] = useState(task.status);

     let hasError;
     const showHideClass = modalStatus === "editModal" ? 'flex-center' : 'hidden';

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
               const result = await updateTask(body, options, task.id);
               if (result) {
                    dispatch(FetchActions.setFetcherResolcer());
                    onBack();
               }
          }
     }

     function onBack() {
          dispatch(ModalActions.hideModal());
          dispatch(ModalActions.deselectTask());
     }

     function chosenStatusChangeHandler(status) {
          setChosenStatus(status);
     }

     function chosenTimeChange(value) {
          setChosenTimeValue(value.value);
     }

     return createPortal(
          <>
               <article className={`width-height-screen  ${showHideClass}`}>
                    <section className="w-[550px] mx-6 px-3 py-2 black-dark-shadow rounded-md bg-white ">

                         <div className="w-full flex justify-start px-1 py-1 mb-3">
                              <button onClick={onBack}>
                                   {iconDel}
                              </button>
                         </div>

                         <form onSubmit={submitHandler} className=" w-full flex flex-col gap-4">
                              <div className="flex items-center gap-4 my-2">
                                   <label htmlFor="name" className="font-bold w-16">عنوان </label>
                                   <div className="flex flex-col items-ceter gap-2 w-full">
                                        <input type="text" name="name" ref={chosenName} defaultValue={task.name} className={`w-2/3 border rounded-md px-2 py-1 h-10
                                    bg-gray-100 black-light-shadow focus:outline-none ${nameErrClass}`} placeholder="عنوان وظیفه" />
                                        {
                                             nameErrClass &&
                                             <span className="text-red-200 text-sm"> لطفا عنوان وظیفه را وارد کنید </span>
                                        }
                                   </div>
                              </div>
                              <hr />
                              <div className="flex gap-2 items-center my-2">
                                   <label htmlFor="status" className="font-bold">وضعیت </label>
                                   <div className="flex items-center gap-2">
                                        <span className="cursor-pointer">انجام نشده</span>
                                        <input type="radio" name="status" className="cursor-pointer" onChange={() => chosenStatusChangeHandler('not-done')}
                                             checked={chosenStatus === 'not-done'} />

                                        <span className="cursor-pointer">انجام شده</span>
                                        <input type="radio" name="status" className="cursor-pointer" onChange={() => chosenStatusChangeHandler('done')}
                                             checked={chosenStatus === 'done'} />

                                        <span className="cursor-pointer">در حال انجام</span>
                                        <input type="radio" name="status" className="cursor-pointer" onChange={() => chosenStatusChangeHandler('doing')}
                                             checked={chosenStatus === 'doing'} />

                                   </div>
                              </div>
                              <hr />
                              <div className="flex items-center gap-2 my-2">
                                   <label htmlFor="time" className="font-bold w-12">زمان </label>
                                   <div className="w-full flex flex-col gap-2">
                                        <div className={`bg-gray-100 flex gap-5 w-2/3 rounded-md black-light-shadow border-spacing-2
                                    border-red-900 p-2 ${timeErrClass}`}>
                                             <span>{calender}</span>
                                             <DatePicker defaultValue={task.time} onChange={(value) => chosenTimeChange(value)} inputClass="w-full" />
                                        </div>
                                        {
                                             timeErrClass &&
                                             <span className="text-red-200 text-sm"> لطفا زمان وظیفه را وارد کنید </span>
                                        }
                                   </div>
                              </div>
                              <div className="w-full">
                                   <button type="submit" className="btn-green">ثبت</button>
                              </div>

                         </form>
                    </section>
               </article >
          </>
          , document.getElementById('Modal')
     )

}
