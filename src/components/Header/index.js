import React, {  useEffect, useState } from 'react'
import './style.css'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import {  signOut } from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userimg from '../../assets/user.svg';
import {  doc, getDoc} from 'firebase/firestore';


 function Header({isprofileUpdated}) {
    const [user,loading]=useAuthState(auth);
    const navigate=useNavigate();
    const location=useLocation();
useEffect(()=>{
if (user && location.pathname=='/'){
  //console.log(window.location.href,'in href',location.pathname);
  //console.log(user);
    navigate('/dashboard');
}  
},[user,loading]);

useEffect(()=>{
  setTimeout(()=>getUserName(),500);},[user,isprofileUpdated]);
const [userDetails,setUserDetails]=useState();
////////////////////////////////////
async function getUserName(){
  try{
  if(user){
    const userDocRef = doc(db, `users/${user.uid}`);
  const querysnapshot=await getDoc(userDocRef);
  const currentuserdata=querysnapshot.data();
 //console.log(currentuserdata,'in header data');
 setUserDetails(currentuserdata);
 if(currentuserdata.themeColor){
  const root=document.documentElement;
  root.style.setProperty('--theme',currentuserdata.themeColor);
}
  }}catch(e){
    console.log(e.message);
  }
}
//////////////////////////////////////////////
//logout Function
 async  function logoutfnc(){
    try{
        signOut(auth).then(() => {
          // Sign-out successful.
          toast.success('Logged out successfully!');
          navigate('/');
        }).catch((error) => {
          // An error happened.
          toast.error(error.message);
        });
    }catch(e){
        toast.error(e.message);
    }
   }
   ///////////////////////////////////////////////
  return (
    <div className='navbar'>
    <p className='logo' title={user?'Navigate to dashboard':''} onClick={()=>{if(user && location.pathname!=='/dashboard')navigate('/dashboard')}}>Financely.</p>
    {user && <div  style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
      <p className='userName-header'>Welcome back, {userDetails && <span style={{textTransform:'capitalize'}}>{userDetails.name}</span>}!</p>
      <p title='Navigate to Profile' className='navigateToProfilePage' onClick={()=>{if(location.pathname!=='/profile')navigate('/profile')}}>{userDetails && <img src={userDetails.photoURL ? userDetails.photoURL:userimg} style={{display:'block',width:'1.5rem', height:'1.5rem',borderRadius:'50%'}} />}</p>
      <p className='logo link' title='Logout' onClick={logoutfnc}>Logout</p></div>
    }
    </div>
  )
}

export default Header