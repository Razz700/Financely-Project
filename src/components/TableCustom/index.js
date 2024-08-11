import React, { useEffect, useMemo, useState } from 'react'
import './style.css'
import nodata from '../../assets/no data.png'
import CustomModal from '../CustomModal';
import EditModal from '../CustomModal/EditModal';

function Tablecustom({data,columns,deleteTransaction,editTransaction}) {
    

//console.log(data,'in custable');

    const pages=useMemo(()=>calulatepages(data),[data]);
    function calulatepages(data){
        const arr=[]
        const val=Math.ceil(data.length/10.0);
        for (let i = 1; i <=val; i++) {
           arr.push(i);
        }
        return arr;
    }
const [classActive,setClassActive]=useState(1);
const [newdata,setnewdata]=useState(data.slice(0,10));
const [disabled,setdisabled]=useState(()=>data.length>10?[true,false]:[true,true]);
function navigatePage(page,rdata){
    let activePage=classActive;
    if (page==='previous') {
       activePage=classActive-1;
        setnewdata(data.slice((activePage-1)*10,(activePage)*10));
    }else if(page==='next'){
        activePage=classActive+1;
     setnewdata(data.slice((activePage-1)*10,(activePage)*10));
    }else{
        activePage=page;
        setnewdata(data.slice((page-1)*10,page*10));
    }
    setClassActive(activePage);
    // console.log(activePage,pages.length,'message');
    rdata?console.log(rdata):console.log('hi');
    setdisabled([activePage===1,activePage===pages.length || pages.length===0]);
}
useEffect(()=>navigatePage(1,data),[data]);
////////////////////modal code////////////////////
const [isModalDeleteOpen,setDeleteModalOpen]=useState(false);
const [modalData,setModalData]=useState([]);

const handleDeletebtn=(item)=>{
setDeleteModalOpen(true);
setModalData(item);
}

const [isModalEditOpen,setisModalEditOpen]=useState(false);
const handleEditbtn=(item)=>{
setisModalEditOpen(true);
setModalData(item);
}
////////////////////////////////////////////////////
  return (
    <>
  <table>
    <thead>
 <tr>
    {columns.map((item)=><th key={item.key}>{item.title}</th>)}
 </tr>
    </thead>
    <tbody>
{newdata.map((item,i)=><tr key={item.name+'data'+i}>
        <td>{item.name}</td>
        <td>{item.tag}</td>
        <td>{item.type}</td>
        <td>{item.amount}</td>
        <td>{item.date}</td>
        <td><p onClick={()=>{handleEditbtn(item)}} className='table-btn'>Edit</p>  
        <p onClick={()=>handleDeletebtn(item)} className='table-btn'>Delete</p></td>
    </tr>)}
    {/* No data Image */}
{pages.length===0 && <tr><td colSpan={columns.length} className='nodata'><div><img alt='NO-data-img' src={nodata}/></div></td></tr>}

{pages.length!==0 && <tr style={{borderBottom:'none'}} className='last-row-column'><td style={{textAlign:'right'}} colSpan={columns.length}>
    <div>
    <button onClick={()=>navigatePage('previous')} disabled={disabled[0]} className='table-btn-nav'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg></button>
{pages.map((item,i)=><button onClick={()=>{navigatePage(item)}} key={'tableActiveBtn'+i} className={item===classActive?'table-btn-nav activeTableBtn':'table-btn-nav'}>{item}</button>)}
    <button onClick={()=>navigatePage('next')} disabled={disabled[1]} className='table-btn-nav'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg></button>
    </div>
    </td></tr>}
    </tbody>
  </table>
  <CustomModal deleteTransaction={deleteTransaction} modalData={modalData} setDeleteModalOpen={setDeleteModalOpen} isModalDeleteOpen={isModalDeleteOpen} />
  <EditModal editTransaction={editTransaction} isModalEditOpen={isModalEditOpen} modalData={modalData} setisModalEditOpen={setisModalEditOpen}  />
  </>
  )
}

export default Tablecustom