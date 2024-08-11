import React from 'react'
import './style.css'
function Input({label,state,setstate,placeholder,type}) {
  return (
    <div className='input-wrapper'>
        <label htmlFor='input' className='label-input'>{label}</label>
        <input type={type} id='input' value={state} placeholder={placeholder} onChange={(e)=>setstate(e.target.value)} className='custom-input' required />
    </div>
  )
}

export default Input