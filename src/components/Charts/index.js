import React from 'react'
import { Line, Pie } from '@ant-design/charts';
import './style.css'

function ChartComponent({transactions}) {
  //const [isModalChartOpen,setIsModalChartOpen]=useState(false);
    let sortedTransactions=transactions.sort((a,b)=>{
        return new Date(a.date)-new Date(b.date);
       });
    const data = sortedTransactions.map((item)=>{
        return {date:item.date,amount:item.amount}
    });
    const spendingData=sortedTransactions.filter((item)=>item.type==='expense');
    let newSpending=[{tag:'food',amount:0},{tag:'education',amount:0},{tag:'office',amount:0},{tag:'others',amount:0}];
    spendingData.forEach(item => {
      if (item.tag==='food') {
          newSpending[0].amount+=item.amount;
      }else if(item.tag==='education'){
          newSpending[1].amount+=item.amount;
      }else if(item.tag==='office'){
          newSpending[2].amount+=item.amount;
      }else{
          newSpending[3].amount+=item.amount;
      }
    });
    // let finalspending=spendingData.reduce((acc,obj)=>{
    //     let key=obj.tag;
    //     if (!acc[key]) {
    //         acc[key]={tag:obj.tag,amount:obj.amount}
    //     }else{
    //         acc[key]+=obj.amount
    //     }
    //     return acc;
    // });
      const config = {
        data:data,
        width: 600,
        autoFit: true,
        xField: 'date',
        yField: 'amount',
      };
      const spendingconfig = {
        data:newSpending,
        width: 400,
        autoFit: true,
       angleField:'amount',
       colorField:'tag',
      };
      let chart;
      let piechart;
  return (
    <div className='chart-wrapper'>
        <div><h2 style={{paddingLeft:'10px'}}>Your Analytics</h2>
 <Line {...config} key={JSON.stringify(data)}
 onReady={(chartInstance) => (chart = chartInstance)} 
 />
  </div>
  <div><h2 style={{paddingLeft:'10px'}}>Your Spendings</h2>
 <Pie  {...spendingconfig} key={JSON.stringify(spendingData)}
 onReady={(chartInstance) => (piechart = chartInstance)}
  />
  </div>
           </div>
  
  )
}

export default ChartComponent