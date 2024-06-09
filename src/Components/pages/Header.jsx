import { Link, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Header({ children }) {
     const linkClasses = 'flex-center h-full w-1/3 ';
     const location = useLocation();
     return (
          <>
               <header className="w-4/5 rounded-md flex flex-col items-center bg-slate-600 mx-auto mt-16 ">

                    <section className="w-full h-12 flex">
                         <Link to='/' className={location.pathname === '/' ? `bg-white rounded-tr-md ${linkClasses}` :
                              `bg-slate-600 rounded-tr-md ${linkClasses}`}>
                              <button>
                                   وظایف
                              </button>
                         </Link>

                         <Link to='/services' className={location.pathname === '/services' ? `bg-white ${linkClasses}` :
                              `bg-slate-600 ${linkClasses}`}>
                              <button>
                                   سرویس ها
                              </button>
                         </Link>

                         <Link to='/addTask' className={location.pathname === '/addTask' ? `bg-white rounded-tl-md ${linkClasses}` :
                              `bg-slate-600 rounded-tl-md ${linkClasses}`}>
                              <button>
                                   وظیفه جدید
                              </button>
                         </Link>
                    </section>

                    <section className="w-full py-5 px-10 rounded-b-md flex flex-col gap-4 bg-white shadow-md">
                         {children}
                    </section>
               </header>
          </>
     );
}