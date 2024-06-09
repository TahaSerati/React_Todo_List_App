/* eslint-disable react/prop-types */
export default function Service({ item }) {
     return (
          <>
               <section className="w-full flex flex-col rounded-md leading-3 hover:bg-slate-300 transition-all duration-300
                                   bg-slate-200 p-3 dir-ltr black-light-shadow">

                    <div className="w-full h-min object-contain ">
                         <img className="rounded-t-md w-full h-full object-contain" src={item.url}
                              alt={item.media_type} />
                    </div>
                    <div className="w-full h-2/3 my-3">
                         <span className="font-bold text-2xl">{item.title}</span>
                         <div className="w-full 
                         transition-all duration-300 hover:h-min hover:black-shadow">

                              <span className="font-bold text-xl">details :</span>
                              <span className="text-sm ml-2">{item.explanation}</span>
                         </div>
                         <div className="w-full ">
                              <span className="font-bold text-gray-600 text-sm">date :</span>
                              <span className="text-sm text-gray-600 ml-3">{item.date}</span>
                         </div>
                    </div>
               </section>
          </>
     );
}