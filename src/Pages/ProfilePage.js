import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import './profilePage.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import userimg from '../assets/user.svg'
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ProfileModal from '../components/CustomModal/ProfileModal';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function ProfilePage() {
  const [user,loading]=useAuthState(auth);
  const [isprofileUpdated,setisProfileUpdated]=useState(false);
 // const location=useLocation();
  const [isModalProfileOpen,setprofileModalopen]=useState(false);
 // const {propsForProfilePage}=location.state || {};
  const [loadprofile,setloadProfile]=useState(false);
  const navigate=useNavigate();
  const [userDetails,setUserDetails]=useState();
//console.log(user,'test what it ');

useEffect(()=>{getUserName()},[user]);

////////////////////////////////////
async function getUserName(){
  try{
  if(user){
    const userDocRef = doc(db, `users/${user.uid}`);
  const querysnapshot=await getDoc(userDocRef);
 //console.log(querysnapshot.data(),'hi data');
 setUserDetails(querysnapshot.data());
 //getName(querysnapshot.data());
  }}catch(e){
    console.log(e.message);
  }
}
//////////////////////////////////////////////
async function updateProfileDetails(newdata){
 // console.log(newdata);
  if(!user)return;
   setloadProfile(true);
 const useref=doc(db,"users", user.uid);
 //console.log(userData,user);
  try{
   await updateDoc(useref, {...newdata});
   const userDocRef = doc(db, `users/${user.uid}`);
   const querysnapshot=await getDoc(userDocRef);
   const currentuserdata=querysnapshot.data();
   setUserDetails(currentuserdata);
   const root=document.documentElement;
  root.style.setProperty('--theme',currentuserdata.themeColor);
      setloadProfile(false);
     toast.success('Profile Updated!');
     setisProfileUpdated(!isprofileUpdated);
  }catch(e){
      toast.error(e.message);
    setloadProfile(false);
  }
}
  return (
   <>
   <Header isprofileUpdated={isprofileUpdated} />
   <div className='profilepage-background'>
    <div className='profilepage-elem1'></div>
    <div className='profilepage-elem2'></div>
    <div className='profilepage-elem3'></div>
   </div>
{user && <><div className='profile-content'>
  <div className='profile-content-div'>
  {userDetails && <><div className='img'><img src={userDetails.photoURL ? userDetails.photoURL:userimg} style={{display:'block',width:'100%', height:'100%',borderRadius:'50%'}} /></div>
 <p className='userDetails-name'>{userDetails.name}</p>
  <p style={{textAlign:'center'}}>{userDetails.email}</p>
    <div className='flex'>
      <div><p className='bold'>{userDetails.income?userDetails.income:0}</p>
      <p>Total Income in Rupees</p></div>
      
      <div><p className='bold'>{userDetails.expense?userDetails.expense:0}</p>
      <p>Total Expense in Rupees</p></div>
      
      <div><p className='bold'>{userDetails.transactionsCount?userDetails.transactionsCount:0}</p>
      <p>Total Transactions</p></div>
    </div>
    <Button onclick={()=>setprofileModalopen(true)} blue={true} text={'Update Profile'}  />
    <Button onclick={()=>{
      navigate('/dashboard');
    }}  text={'Go To Dashboard'}/></>}
  </div>
  </div> 
  <ProfileModal loadprofile={loadprofile} updateProfileDetails={updateProfileDetails} userDetails={userDetails} isModalProfileOpen={isModalProfileOpen} setprofileModalOpen={setprofileModalopen}  /> </>
  }
   </>
  )
}

export default ProfilePage