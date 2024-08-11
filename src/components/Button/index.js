import React from 'react'
import './style.css'
function Button({blue,text,onclick,isdisabled}) {
  return (
    <button disabled={isdisabled} onClick={onclick} className={blue?'btn btn-blue':'btn'}>{text}</button>
  )
}

export default Button