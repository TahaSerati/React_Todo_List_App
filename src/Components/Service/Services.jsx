import { useEffect, useState } from "react";
import { getAllServices } from "../../utils/http";
import { spinner } from "../UI/UI";
import Header from "../pages/Header";
import Service from "./Service";

export default function Services() {
     const [fetchedService, setFetchedService] = useState();
     const servicesList = [fetchedService, fetchedService, fetchedService, fetchedService];

     useEffect(() => {
          async function setFetchData() {
               const fetchedData = await getAllServices();
               setFetchedService(fetchedData);
          }
          setFetchData();
     }, [])

     return (
          <>
               <Header>
                    <section className="w-full px-3 py-2 ">
                         <h1 className="font-bold text-xl">اتصال به سرویس ها</h1>
                         <p className="font-sm text-gray-500 mt-4">سرویس ها در غالب کارت قابل مشاهده شما هستند.</p>
                    </section>
                    <article className="w-full grid-services mt-12">
                         {
                              fetchedService &&
                              servicesList.map((item) => (
                                   <Service key={item} item={item} />
                              ))
                         }

                    </article>
                    {
                         !fetchedService &&
                         <div className="w-full h-full flex-center">
                              <div> {spinner} </div>
                         </div>
                    }
               </Header>
          </>
     );
}

/*
     about component : 
     
*/