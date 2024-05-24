import React,{useState} from "react";
import home from "../asset/home.png";
import order from "../asset/orders.png";
import menu from "../asset/menu.png";
import support from "../asset/help.png";
import settings from "../asset/settings.png";
import { motion } from "framer-motion";
import AdminHome from "./AdminHome";
import AdminOrders from "./AdminOrders";
import Menu from "./Menu";
import Suppot from "./Suppot";
import Setting from "./Setting";


function RestaurantPage() {
  const [page, setPage] = useState("home");
  return (
    <div className="w-screen h-screen flex gap-4 px-2 mb-2">
      <div className="w-24 h-screen flex items-center justify-center">
        <motion.div
          initial={{ x: -100,y:20 ,scale: 0.5 }}
          animate={{ x:0,y:0, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-fit p-4 shadow-[inset_-12px_-8px_40px_#FFE9C1] rounded-full ml-4 flex-col"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPage("home")}
            className="w-full h-20 cursor-pointer select-none my-2 flex flex-col justify-center items-center"
          >
            <img src={home} className="w-10 h-10" />
            <p className="text-amber-500 text-lg">Home</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPage("orders")}
            className="w-full h-20 cursor-pointer select-none my-2 flex flex-col justify-center items-center"
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              src={order}
              className="w-10 h-10"
            />
            <p className="text-amber-500 text-lg">Orders</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPage("menu")}
            className="w-full h-20 cursor-pointer select-none my-2 flex flex-col justify-center items-center"
          >
            <motion.img
              whileHover={{ rotateY: 360 }}
              whileTap={{ rotateY: 180 }}
              transition={{ duration: 1 }}
              src={menu}
              className="w-10 h-10"
            />
            <p className="text-amber-500 text-lg">Menu</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPage("support")}
            className="w-full h-20 cursor-pointer select-none my-2 flex flex-col justify-center items-center"
          >
            <motion.img
              whileHover={{ rotateY: 360 }}
              whileTap={{ rotateY: 180 }}
              transition={{ duration: 1 }}
              src={support}
              className="w-10 h-10"
            />
            <p className="text-amber-500 text-lg">Support</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPage("settings")}
            className="w-full h-20 cursor-pointer select-none my-2 flex flex-col justify-center items-center"
          >
            <motion.img
              whileHover={{ rotate: 50 }}
              whileTap={{ rotate: -70 }}
              src={settings}
              className="w-10 h-10"
            />
            <p className="text-amber-500 text-lg">Settings</p>
          </motion.div>
        </motion.div>
      </div>
      <div className="w-full min-h-screen h-full overflow-scroll flex items-end justify-end">
        {page === "home" && <AdminHome />}
        {page === "orders" && <AdminOrders />}
        {page === "menu" && <Menu />}
        {page === "support" && <Suppot />}
        {page === "settings" && <Setting />}
      </div>
    </div>
  );
}

export default RestaurantPage;
