import React, { useState } from 'react'
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth,db } from '../../../firebase.js' 
import { doc, setDoc } from "firebase/firestore"; 
import './style.css'
import Input from '../../Input'
import Button from '../../Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from '../../../firebase.js';

function SignUpcomponent() {
    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [confirmpassword,setconfirmpassword]=useState('');
    const [loading,setloading]=useState(false);
    const [loginForm,setloginForm]=useState(false);
    const navigate=useNavigate();

 function SignupwithEmail(){
    setloading(true);
   // console.log(name,email,password,confirmpassword);
    if (name!='' && email!='' && password!='' && confirmpassword!='') {
        if (password==confirmpassword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
             // console.log(user);
              toast.success('User Created!');
              setloading(false);
              setname('');
              setemail('');
              setpassword('');
              setconfirmpassword('');
              createDoc(user);
              navigate('/dashboard');
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              toast.error(errorMessage);
              setloading(false);
              // ..
            });   
        }else{
            toast.error('Password and ConfirmPassword won\'t match');
            setloading(false);
        }

    }else{
       toast.error('All fields are mandatory!');
       setloading(false);
    }
 }   

 async function createDoc(user){
    //make sure doc with uid doesn't exits
    if(!user)return;
    setloading(true);
const useref=doc(db,"users", user.uid);
const userData=await getDoc(useref);
//console.log(userData);
if (!userData.exists()) {
    try{
        const userDoc = doc(db,"users", user.uid);
        await setDoc(userDoc, {
          name:user.displayName?user.displayName:name,
          email:user.email,
          photoURL:user.photoURL?user.photoURL:'',
          createAt:new Date()
          // other user data
        });
        setloading(false);
        toast.success('Doc created!');
    }catch(e){
       toast.error(e.message);
       setloading(false);
    }
}else{
    toast.error('Doc already exists!');
    setloading(false);
}  
 }

 /////////////////////////////////////////////////
 //login Using Email
 function loginUsingEmail(){
    //console.log('email,password',email,password);
    if (email!='' && password!='') {
        setloading(true);
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success('User Logged In!');
    //console.log('User logged In',user);
    setemail('');
    setpassword('');
    navigate('/dashboard');
    setloading(false);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setloading(false);
    toast.error(errorMessage);
  });
    }else{
        toast.error('All fields are mandatory!');
        setloading(false);
    }
 }

 //////////////////////////////////////////////////
 //signup/signin using Google
 async function signUpInUsingGoogle(){
setloading(true);
try{
    //const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
       // console.log(user);
        setloading(false);
        toast.success('User Authenticated!');
        navigate('/dashboard')
        createDoc(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setloading(false);
        toast.error(errorMessage);
        // ...
      });
}catch(e){
    toast.error(e.message);
    setloading(false);
}
 }
    return (
        <>
        {loginForm?
      <div className='signup-wrapper'>
      <h2 className='title'>
          Login on <span style={{color:'var(--theme)'}}>Financely.</span>
      </h2>
       <Input type={'email'}
       label={'Email'}
       placeholder={'someone@example.com'}
       state={email}
       setstate={setemail}/>
       <Input type={'password'}
       label={'Password'}
       placeholder={'Password'}
       state={password}
       setstate={setpassword}/>

       <Button disabled={loading} onclick={loginUsingEmail}
        text={loading?'Loading...':'Login Using Email  and Password'}/>
       <p style={{textAlign:'center',fontWeight:'300'}}>or</p>
       <Button disabled={loading}
         onclick={signUpInUsingGoogle}
        text={loading?'Loading...':'Login Using Google'} blue={true}/>
        <p onClick={()=>setloginForm(!loginForm)} className='p-login'>or Don't Have An Account? Click Here</p>
      </div>
        :
        <div className='signup-wrapper'>
        <h2 className='title'>
            Sign Up on <span style={{color:'var(--theme)'}}>Financely.</span>
        </h2>
        <Input type={'text'}
         label={'Full Name'}
         placeholder={'John Doe'}
         state={name}
         setstate={setname}/>
         <Input type={'email'}
         label={'Email'}
         placeholder={'someone@example.com'}
         state={email}
         setstate={setemail}/>
         <Input type={'password'}
         label={'Password'}
         placeholder={'Password'}
         state={password}
         setstate={setpassword}/>
         <Input type={'password'}
         label={'Confirm Password'}
         placeholder={'Confirm Password'}
         state={confirmpassword}
         setstate={setconfirmpassword}/>
         <Button disabled={loading} onclick={SignupwithEmail}
          text={loading?'Loading...':'Signup Using Email  and Password'}/>
         <p style={{textAlign:'center',fontWeight:'300'}}>or</p>
         <Button disabled={loading}
         onclick={signUpInUsingGoogle}
          text={loading?'Loading...':'Signup Using Google'} blue={true}/>
         <p onClick={()=>setloginForm(!loginForm)} className='p-login'>or Have An Account Already? Click Here</p>
        </div>}  </>
  )
}

export default SignUpcomponent