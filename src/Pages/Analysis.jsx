import React from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,PieChart, Pie, Cell} from "recharts";
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
function Analysis() {
    const data = [
        {
          name: "Page A",
          uv: 4000,
          pv: 2400,
          amt: 2400
        },
        {
          name: "Page B",
          uv: 3000,
          pv: 1398,
          amt: 2210
        },
        {
          name: "Page C",
          uv: 2000,
          pv: 9800,
          amt: 2290
        },
        {
          name: "Page D",
          uv: 2780,
          pv: 3908,
          amt: 2000
        },
        {
          name: "Page E",
          uv: 1890,
          pv: 4800,
          amt: 2181
        },
        {
          name: "Page F",
          uv: 2390,
          pv: 3800,
          amt: 2500
        },
        {
          name: "Page G",
          uv: 3490,
          pv: 4300,
          amt: 2100
        }
      ];
      const data2 = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 }
      ];
      const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div className='w-full h-full flex gap-3'>
    <div className='w-3/4 h-full shadow-2xl bg-white rounded-xl'>
    <ResponsiveContainer>
        <AreaChart 
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8"/>
      <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d"/>
      <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658"/>
    </AreaChart>
    </ResponsiveContainer>
    </div>
    <div className='w-1/4 h-full bg-white rounded-xl shadow-xl flex flex-col items-center justify-center'>
    <ResponsiveContainer>
    <PieChart>
      <Pie
        data={data2}
        innerRadius={40}
        outerRadius={100}
        fill="#8884d8"
        label={renderCustomizedLabel}
        paddingAngle={2}
        dataKey="value"
      >
        {data2.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      </PieChart>
      </ResponsiveContainer>
      <div className='w-full h-1/4 flex flex-col'>
        <div className='w-full h-1/2 bg-white flex items-center justify-around'>
            <div className='w-fit h-fit flex gap-2 items-center'>
                <div className={`w-4 h-4 rounded-full bg-[#0088FE]`}></div>
                <p className='text-lg text-black'>Indian Dishes</p>
            </div>
            <div className='w-fit h-fit flex gap-2 items-center'>
                <div className={`w-4 h-4 rounded-full bg-[#00C49F]`}></div>
                <p className='text-lg text-black'>Italian Cusine</p>
            </div>
      </div>
        <div className='w-full h-1/2 bg-white flex items-center justify-around'>
            <div className='w-fit h-fit flex gap-2 items-center'>
                <div className={`w-4 h-4 rounded-full bg-[#FFBB28]`}></div>
                <p className='text-lg text-black'>Indian Dishes</p>
            </div>
            <div className='w-fit h-fit flex gap-2 items-center'>
                <div className={`w-4 h-4 rounded-full bg-[#FF8042]`}></div>
                <p className='text-lg text-black'>Italian Cusine</p>
            </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Analysis