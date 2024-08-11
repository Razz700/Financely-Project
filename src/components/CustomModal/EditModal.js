import React, { useEffect, useState } from 'react'
import './style.css'
import Button from '../Button';
import { toast } from 'react-toastify';


function EditModal({isModalEditOpen,setisModalEditOpen,modalData,editTransaction}) {
  const [name,setname]=useState('');
  const [tag,settag]=useState('');
  const [date,setdate]=useState('');
  const [amount,setamount]=useState('');
    useEffect(() => {
        if (isModalEditOpen) {
            document.body.style.overflow = 'hidden';
            setname(modalData.name);
            settag(modalData.tag);
            setdate(modalData.date);
            setamount(modalData.amount);
        } else {
            document.body.style.overflow = 'auto';
        }
    
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalEditOpen,modalData]);
    ///////////////////////////////////////////
      return (
        <>
       {isModalEditOpen && <div className={"modal"}>
            <div className='modal-content'>
           <p style={{fontWeight:500,textAlign:'center'}}>Edit Details</p>
           <hr/>
           <hr/>
           <p className='editModal-inputs'>Name:<input type='text' value={name} onChange={(e)=>setname(e.target.value)} required /></p>
           <p className='editModal-inputs'>Tag:<select value={tag} onChange={(e)=>settag(e.target.value)} required>
                    {modalData.type=='income' && <>
                        <option value={'salary'}>Salary</option>
                        <option value={'investment'}>Investment</option>
                        <option value={'freelance'}>Freelance</option>
                        <option value={'others'}>Others</option>
                    </>}
                    {modalData.type=='expense' && <>
                        <option value={'food'}>Food</option>
                        <option value={'office'}>Office</option>
                        <option value={'education'}>Education</option>
                        <option value={'others'}>Others</option>
                    </>}
                    </select></p>
                    <p className='editModal-inputs'>Amount: <input type='number' value={amount} onChange={(e)=>setamount(e.target.value)} required /></p>
                    <p className='editModal-inputs'>Date: <input type='date' value={date} onChange={(e)=>setdate(e.target.value)} required /></p>
               <Button blue={true} text={"Update"} onclick={()=>{
              // console.log(name,tag,amount,date);
               if (name!=''  && tag!='' && amount!='' && date!='') {
                editTransaction(modalData,{
                    name:name,
                    tag:tag,
                    date:date,
                    amount:parseInt(amount)
                })
                setisModalEditOpen(false);
               }else{
                toast.error('Please fill All edit fields!');
               }
               }} />
               <Button  text={"Cancel"} onclick={()=>setisModalEditOpen(false)} />
            </div>
            </div>} </>
      )
 
}

export default EditModal