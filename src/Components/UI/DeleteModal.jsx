import { iconDel } from "./UI";
import { useDispatch, useSelector } from "react-redux";
import { FetchActions, ModalActions } from "../../store";
import { deleteTask } from "../../utils/http";
import { createPortal } from "react-dom";

export default function DeleteModal() {

     const dispatch = useDispatch();
     const task = useSelector(state => state.Modal.task);
     const modalStatus = useSelector((state) => state.Modal.status)
     const showHideClass = modalStatus === "deleteModal" ? 'flex-center' : 'hidden';

     

     function onBack() {
          dispatch(ModalActions.deselectTask());
          dispatch(ModalActions.hideModal());
     }

     async function deleteTaskHandler() {
          const options = {
               headers: {
                    'Content-Type': 'application/json'
               }
          }
          const result = await deleteTask(options, task.id);
          if (!result) {
               throw new Error('failed to delete task!');
          }


          // fetch data again and close modal
          dispatch(FetchActions.setFetcherResolcer());
          onBack();
     }

     return createPortal(
          <>
               <article className={`width-height-screen ${showHideClass}`}>

                    <section className="w-[550px] px-3 py-2 rounded-md mx-6 black-dark-shadow bg-white">
                         <div className="w-full flex justify-start px-1 py-1 mb-3 ">
                              <button onClick={onBack}>
                                   {iconDel}
                              </button>
                         </div>

                         <section className="flex flex-col items-center gap-5 w-full">
                              <div className="flex items-center justify-start w-full my-6">
                                   <span>آیا از حذف این وظیفه مطمین هستید ؟</span>
                              </div>
                              <div className="w-full flex items-center justify-start gap-4">
                                   <button onClick={deleteTaskHandler} className="btn-red">حذف</button>
                                   <button onClick={onBack} className="btn-yellow">برگشت</button>
                              </div>
                         </section>
                    </section>

               </article >
          </>
          , document.getElementById('Modal')

     );
}
