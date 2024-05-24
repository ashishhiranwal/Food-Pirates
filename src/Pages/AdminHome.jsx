import React from 'react'
import orderdelivered from "../asset/orderdelivered.png"
import recieved from "../asset/recieved.png"
import newuser from "../asset/newuser.png"
import profit from "../asset/profit.png"
import Analysis from "./Analysis";
function AdminHome() {
  return (
    <div className="w-full h-[88%] rounded-lg px-10">
              <h1 className="text-2xl font-medium text-amber-400">DashBoard</h1>
              <div className="w-full h-44 flex gap-2 mt-5">
                <div className="w-1/4 h-full bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 rounded-2xl">
                  <div className="w-full h-full flex gap-4 backdrop-blur-lg rounded-2xl shadow-2xl justify-center items-center text-xl font-medium">
                    <img className="w-20 h-20" src={orderdelivered}/>
                    <p className=" text-xl text-white">Orders Delivered<br></br><span className="text-2xl">20000</span></p>
                  </div>
                 </div>
                <div className="w-1/4 h-full bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 rounded-2xl">
                  <div className="w-full h-full flex gap-4 backdrop-blur-lg rounded-2xl shadow-2xl justify-center items-center text-xl font-medium">
                    <img className="w-20 h-20" src={recieved}/>
                    <p className=" text-xl text-white">Orders Recieved<br></br><span className="text-2xl">26000</span></p>
                  </div>
                 </div>
                <div className="w-1/4 h-full bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500 rounded-2xl">
                  <div className="w-full h-full flex gap-4 backdrop-blur-lg rounded-2xl shadow-2xl justify-center items-center text-xl font-medium">
                    <img className="w-20 h-20" src={newuser}/>
                    <p className=" text-xl text-white">New Customers<br></br><span className="text-2xl">26000</span></p>
                  </div>
                </div>
                <div className="w-1/4 h-full bg-gradient-to-r from-emerald-500 to-lime-600 rounded-2xl">
                  <div className="w-full h-full flex gap-4 backdrop-blur-lg rounded-2xl shadow-2xl justify-center items-center text-xl font-medium">
                    <img className="w-20 h-20" src={profit}/>
                    <p className=" text-xl text-white">Net Earning<br></br><span className="text-2xl">1,82000</span></p>
                  </div>
                </div>
              </div>
              <div className="w-full h-3/4 my-5 py-5">
              <Analysis/>
              </div>
        </div>
  )
}

export default AdminHome