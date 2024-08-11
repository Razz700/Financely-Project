import React, { useEffect } from 'react'
import './style.css'
import Button from '../Button';

function CustomModal({isModalDeleteOpen,setDeleteModalOpen,modalData,deleteTransaction}) {
  
  useEffect(() => {
    if (isModalDeleteOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    return () => {
        document.body.style.overflow = 'auto';
    };
}, [isModalDeleteOpen]);
  return (
    <>
   {isModalDeleteOpen && <div className={"modal"}>
        <div className='modal-content'>
       <p style={{fontWeight:500,textAlign:'center'}}>Confirm deletion?</p>
       <hr/>
       <hr/>
        <p>Name: {modalData.name}<br/>
            Type: {modalData.type}<br/>
            Tag: {modalData.tag}<br/>
            Amount: {modalData.amount}<br/>
           Date: {modalData.date}<br/></p>
           <Button blue={true} text={"Delete"} onclick={()=>{deleteTransaction(modalData);
            setDeleteModalOpen(false);
           }} />
           <Button  text={"Cancel"} onclick={()=>setDeleteModalOpen(false)} />
        </div>
        </div>} </>
  )
}

export default CustomModal