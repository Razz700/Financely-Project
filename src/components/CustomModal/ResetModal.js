import React, { useEffect } from 'react'
import './style.css'
import Button from '../Button';
import { toast } from 'react-toastify';
function ResetModal({loading,ResetAllTransactions,isResetModalVisible,setResetModalVisible}) {
    useEffect(() => {
        if (isResetModalVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isResetModalVisible]);
    //////////////////////////////////////////
  return (
    <>
    {isResetModalVisible && <div className={"modal"}>
         <div className='modal-content'>
        <p style={{fontWeight:500,textAlign:'center',color: '#372727',paddingBottom:'30px'}}>ALERT:All transactions will be permanently deleted!!</p>
        
        <p style={{fontSize:'0.9rem'}}>If you wish to continue press DELETE ALL</p>
            <Button blue={true} text={loading?'Loading...':"Delete All"} onclick={async()=>{
                try{await ResetAllTransactions();
             setResetModalVisible(false);}catch(e){
                toast.error(e.message);
             }
            }} />
            <Button  text={"Cancel"} onclick={()=>setResetModalVisible(false)} />
         </div>
         </div>} </>
  )
}

export default ResetModal