import { useRef, useEffect, useState } from "react";
// import { createPortal } from "react-dom";
import { circularArrows, iconDel } from "./UI";
import { useDispatch, useSelector } from "react-redux";
import { FetchActions, ModalActions } from "../../store";
import { updateTask } from "../../utils/http";
import { DatePicker } from "zaman";


export default function Modal() {
     const dialog = useRef();
     const chosenName = useRef();

     const task = useSelector((state) => state.Modal.task);
     const modalStatus = useSelector((state) => state.Modal.status)
     const dispatch = useDispatch();

     const [timeErrClass, setTimeErrClass] = useState();
     const [nameErrClass, setNameErrClass] = useState();
     const [chosenStatus, setChosenStatus] = useState(task.status);

     let hasError;
     let chosenTimeValue = { value: task.time };

     useEffect(() => {

          const modal = dialog.current;
          if (modalStatus === 'editModal') {
               modal.showModal();
               document.body.style.overflow = 'hidden';
          }
          return () => {
               modal.close();
               document.body.style.overflow = 'auto';
          }

     }, [modalStatus])

     async function submitHandler(event) {
          // update task  
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

          // update the task
          if (!hasError) {
               const body = JSON.stringify({
                    name: chosenName.current.value,
                    status: chosenStatus,
                    time: chosenTimeValue.value
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
          chosenTimeValue = value;
     }

     return (
          <>
               <article className="w-full h-full flex-center">
                    <section className="w-[550px] px-3 py-2 rounded-md black-light-shadow bg-red-100">
                         <div className="w-full flex justify-start px-1 py-1 mb-3 ">
                              <button onClick={onBack}>
                                   {iconDel}
                              </button>
                         </div>
                         {/* <section className="flex flex-col w-full">
                         <div className="flex items-center gap-4 my-2">
                              <label htmlFor="name" className="font-bold w-10">نام : </label>
                              <div className="flex flex-col items-ceter gap-2 w-full">
                                   <input type="text" name="name" ref={chosenName} className={`w-2/3 border rounded-md px-2 py-1 h-10
                                    bg-gray-100 black-light-shadow focus:outline-none ${nameErrClass}`} placeholder="نام وظیفه" />
                                   {
                                        nameErrClass &&
                                        <span className="text-red-200 text-sm"> لطفا نام وظیفه را وارد کنید </span>
                                   }
                              </div>
                         </div>
                         <div className="flex gap-2 items-center my-4">
                              <label htmlFor="status" className="font-bold">وضعیت : </label>
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
                         <div className="flex items-center gap-2 my-2">
                              <label htmlFor="time" className="font-bold w-12">زمان : </label>
                              <div className="w-full flex flex-col gap-2">
                                   <input type="date" ref={chosenTime} name="time" className={`w-2/3 border rounded-md px-2 py-1 h-10
                                    bg-gray-100 black-light-shadow cursor-pointer ${timeErrClass}`} placeholder="زمان" />
                                   {
                                        timeErrClass &&
                                        <span className="text-red-200 text-sm"> لطفا زمان وظیفه را وارد کنید </span>
                                   }
                              </div>
                         </div>

                    </section> */}

                         <form onSubmit={submitHandler} className=" w-full flex flex-col gap-4">
                              <div className="flex items-center gap-4 my-2">
                                   <label htmlFor="name" className="font-bold w-16">عنوان : </label>
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
                                   <label htmlFor="status" className="font-bold">وضعیت : </label>
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
                                   <label htmlFor="time" className="font-bold w-12">زمان : </label>
                                   <div className="w-full flex flex-col gap-2">
                                        {/* <input type="date" ref={chosenTime} defaultValue={task.time} name="time" className={`w-2/3 border rounded-md px-2 py-1 h-10
                                    bg-gray-100 black-light-shadow cursor-pointer ${timeErrClass}`} placeholder="زمان" /> */}
                                        <div className={`bg-gray-100 flex gap-5 w-min rounded-md black-light-shadow border-spacing-2
                                    border-red-900 p-2 ${timeErrClass}`}>
                                             <span>{circularArrows}</span>
                                             <DatePicker defaultValue={task.time} onChange={(value) => chosenTimeChange(value)} />
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
               </article>
          </>
     );
}