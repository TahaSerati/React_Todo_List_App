import Header from "../pages/Header";
import Task from "./Task";
import { useCallback, useEffect, useState } from "react";
import { getAllTasks } from "../../utils/http";
import { spinner } from "../UI/UI";
import { FetchActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import EditModal from "../UI/EditModal";
import DeleteModal from "../UI/DeleteModal";

export default function Tasks() {
     const [taskStore, setTaskStore] = useState();
     const [filteringStatus, setFilteringStatus] = useState('all');
     const dispatch = useDispatch();
     const fetchStatus = useSelector((state) => state.fetch.status);
     const modalStatus = useSelector((state) => state.Modal.status);
     if (modalStatus != '') {
          document.body.style.overflow = 'hidden';
     } else {
          document.body.style.overflow = 'auto';
     }
     const fetchAllTasks =
          useCallback(
               async function fetchAllTasks() {
                    const data = await getAllTasks();
                    if (filteringStatus === 'all') {
                         setTaskStore(data);
                         return;
                    }
                    const sortedTasks = data?.filter((task) => task.status === filteringStatus);
                    setTaskStore(sortedTasks);
               }, [filteringStatus]);

     useEffect(() => {
          if (fetchStatus == 'fetchAgain' || fetchStatus == '') {
               fetchAllTasks();
               dispatch(FetchActions.onSetFetcherResolcer());
          }
     }, [fetchStatus, dispatch, fetchAllTasks])



     async function onFilterChangeHandler(status) {
          // fetch data again not using fetchSlice for managing.
          setFilteringStatus(status);

          const data = await getAllTasks();
          if (status === 'all') {
               setTaskStore(data);
               return;
          }
          const sortedTasks = data?.filter((task) => task.status === status);
          setTaskStore(sortedTasks);
     }

     return (
          <>
               <Header>

                    <section className="w-full my-1">
                         <h2 className="text-xl font-bold ">وظایف شما</h2>
                         <span className="text-gray-500 text-sm">به پنل وظایف خوش آمدید، اینجا میتوانید وظایف خود را بررسی کنید یا تغییر دهید.</span>
                    </section>
                    <hr />

                    <div className="overflow-auto">
                         <section className="md:w-[600px] w-full py-1 px-2 flex flex-col gap-4 md:flex-row">
                              <div>
                                   فیلتر :
                              </div>
                              <div className="flex gap-2 items-center">
                                   <input type="radio" name="filter" className="mt-1 cursor-pointer"
                                        onChange={() => onFilterChangeHandler('all')} checked={filteringStatus === 'all'} />
                                   <label htmlFor="filter">همه وظایف</label>
                              </div>
                              <div className="flex gap-2 items-center">
                                   <input type="radio" name="filter" className="mt-1 cursor-pointer"
                                        onChange={() => onFilterChangeHandler('doing')} checked={filteringStatus === 'doing'} />
                                   <label htmlFor="filter">در حال اجرا</label>
                              </div>
                              <div className="flex gap-2 items-center">
                                   <input type="radio" name="filter" className="mt-1 cursor-pointer"
                                        onChange={() => onFilterChangeHandler('done')} checked={filteringStatus === 'done'} />
                                   <label htmlFor="filter">انجام شده</label>
                              </div>
                              <div className="flex gap-2 items-center">
                                   <input type="radio" name="filter" className="mt-1 cursor-pointer"
                                        onChange={() => onFilterChangeHandler('not-done')} checked={filteringStatus === 'not-done'} />
                                   <label htmlFor="filter">انجام نشده</label>
                              </div>
                         </section>
                    </div>

                    <section className="w-full flex flex-col items-center gap-4">
                         {
                              taskStore &&
                              taskStore.map((task) => (
                                   <Task key={task.id} task={task} />
                              ))
                         }
                    </section>
                    {
                         !taskStore &&
                         <div className="w-full flex-center">
                              {spinner}
                         </div>
                    }
                    {
                         taskStore && taskStore.length < 1 &&
                         <span>هیچ وظیفه ای یافت نشد!</span>
                    }
                    {
                         modalStatus === 'editModal' &&
                         <EditModal />
                    }
                    {
                         modalStatus === 'deleteModal' &&
                         <DeleteModal />
                    }


               </Header>


          </>
     );
}