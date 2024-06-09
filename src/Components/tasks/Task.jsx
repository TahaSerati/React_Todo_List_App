/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { circularArrows, clock, pencile, tik, trash } from "../UI/UI";
import { ModalActions } from "../../store";
import { DatePicker } from "zaman";

export default function Task({ task }) {
     const dispatch = useDispatch();
     // const modalStatus = useSelector((state) => state.Modal.status)
     // let openDelModal = modalStatus === 'deleteModal';
     // let openEdModal = modalStatus === 'editModal';
     let statusName;
     let statusIcon;
     switch (task.status) {
          case 'not-done':
               statusIcon = circularArrows;
               statusName = 'انجام نشده';
               break;
          case 'done':
               statusIcon = tik;
               statusName = 'انجام شده';
               break;
          case 'doing':
               statusIcon = clock;
               statusName = 'در حال اجرا';
               break;
     }

     function deleteHandler() {
          dispatch(ModalActions.showDeleteModal());
          dispatch(ModalActions.selectTask(task));
     }

     function editHandler() {
          dispatch(ModalActions.showEditModal());
          dispatch(ModalActions.selectTask(task));
     }

     return (
          <>
               <article className={`w-full px-3 py-3 rounded-md border border-slate-700 bg-neutral-100 cursor-pointer
                flex flex-col gap-3 transition-all duration-300 hover:shadow-md hover:shadow-slate-600`}>

                    <section id="title_section" className="w-full flex flex-col items-center md:flex-row justify-between">

                         <div className="flex items-center gap-3">
                              <div>
                                   {statusIcon}
                              </div>
                              <div>
                                   <h1>{task.name}</h1>
                              </div>
                         </div>

                         <div className="flex gap-1">
                              <div onClick={editHandler} className="cursor-pointer p-2 rounded-full
                                   transition-all duration-300  hover:text-yellow-500">
                                   {pencile}
                              </div>

                              <div onClick={deleteHandler} className="cursor-pointer p-2 rounded-full transition-all duration-300 hover:text-red-500">
                                   {trash}
                              </div>
                         </div>
                    </section>

                    <section id="description" className="w-full flex flex-col gap-2 md:gap-8 md:flex-row">
                         <div className="flex items-center gap-1">
                              <span className="text-[10px] text-gray-500">وضعیت : </span>
                              <span className="text-[10px] text-gray-500">{statusName}</span>
                         </div>

                         <div className="flex items-center w-[300px] overflow-auto gap-3">
                              <span className="text-[10px]  text-gray-500">زمان : </span>
                              <DatePicker inputAttributes={{ disabled: true }} defaultValue={task.time} inputClass="text-xs text-gray-400" />

                              {/* <span className="text-[10px] text-gray-500">{task.time}</span> */}
                         </div>

                    </section>
               </article>


               {/* {
                    openDelModal &&
                    <DeleteModal open={openDelModal} />
               }
               {
                    openEdModal &&
                    <EditModal />
               } */}
          </>
     );
}