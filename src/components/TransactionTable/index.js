import React, { useState } from 'react'
import './style.css'
import {  Radio, Select } from 'antd';
import searchimg from '../../assets/search.svg' 
import Button from '../Button';
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';
import Tablecustom from '../TableCustom';


function TransactionTable({transactions,addtransaction,deleteTransaction,editTransaction}) {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
          },
          {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
          },
          {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
          },
      ];
      const [search,setSearch]=useState('');
      const [typefilter,setTypefilter]=useState('');
      const [sortkey,setsortkey]=useState('');
   
      let filteredTransactions=transactions.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()) && item.type.toLowerCase().includes(typefilter.toLowerCase()));
      let sortedTransactions=filteredTransactions.sort((a,b)=>{
        if (sortkey==='date') {
         return new Date(a.date)-new Date(b.date); 
        }else if(sortkey==='amount'){
          return a.amount-b.amount;
        }else{
          //console.log(a.name,b.name);
          
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        }
      });  
 // console.log(sortedTransactions,sortkey);
  
///////////////////////////////////////////////////
      function exportcsv(){
        var csv = unparse({
          "fields": ["name", "date","type","tag","amount"],
          "data": transactions
        });
        var data = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
var csvURL = window.URL.createObjectURL(data);
let tempLink = document.createElement('a');
tempLink.href = csvURL;
tempLink.download='transactions.csv';
document.body.appendChild(tempLink);
tempLink.click();
document.body.removeChild(tempLink);
      }
      //////////////////////////////////////////
      function formatDate(date) {
        const arr=date.split('-');
        if(arr[0].length===4){return date};
        const arr1=arr.reverse();
        const date1=arr1.join('-');
        return date1;
      }
//////////////////////////////////////////////////////
 function importcsv(e){
e.preventDefault();
try{
parse(e.target.files[0],{
  header:true,
  complete: async function(results) {
  //  console.log('results>>>',results);
    for(const transaction of results.data){
     // console.log(transaction,'transactions');
      if (transaction.name!=='' && transaction.type!=='' && transaction.date!=='' && transaction.amount!=='' && transaction.tag!=='') {
        const newTransaction={
          ...transaction,
          date:formatDate(transaction.date),
          amount:parseFloat(transaction.amount)
        };
        await addtransaction(newTransaction,true);
      }
    }
  }
});
toast.success('All transaction fetched!');
e.target.files=null;
}catch(e){
  toast.error(e.message);
}
}  
////////////////////////////////////////////
    
  return (
    <>
    <div className='input-flex'>
      <div className='search-input'>
        <img src={searchimg} alt='search icon' />
      <input value={search} 
    onChange={(e)=>setSearch(e.target.value)} type='text' placeholder='Search by name' />
      </div>
   <Select
    className='select-input'
    value={typefilter}
    onChange={(value)=>{setTypefilter(value)}}
    placeholder='Filter'
    allowClear >
      <Select.Option value=''>All</Select.Option >
     <Select.Option  value='income'>Income</Select.Option >
     <Select.Option  value='expense'>Expense</Select.Option >
    </Select>
    </div>
    
    <div className='table-box'>  
    <div className='input-flex'>
      <h2>My Transactions</h2>

    <Radio.Group
    className='input-radio'
    onChange={(e)=>setsortkey(e.target.value)}
    value={sortkey} >
      <Radio.Button value=''>No Sort</Radio.Button>
      <Radio.Button value='date'>Sort by Date</Radio.Button>
      <Radio.Button value='amount'>Sort by Amount</Radio.Button>
    </Radio.Group>
<div className='csvbtns'><Button onclick={exportcsv} text={'Export CSV'}/>
<label className='btn btn-blue' htmlFor='file-csv'>Import CSV</label>
<input accept='.csv' required onChange={importcsv} type='file' id='file-csv' style={{display:'none'}} /></div>
    </div>
   {/* <Table dataSource={sortedTransactions} columns={columns} /> */}
   <Tablecustom data={sortedTransactions} columns={columns} deleteTransaction={deleteTransaction} editTransaction={editTransaction} />
   </div>
     </>
  )
}

export default TransactionTable