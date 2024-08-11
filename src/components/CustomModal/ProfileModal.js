import React, { useEffect, useState } from 'react'
import './style.css'
import Button from '../Button';
import { toast } from 'react-toastify';
import Input from '../Input';

function ProfileModal({loadprofile,updateProfileDetails,isModalProfileOpen,setprofileModalOpen,userDetails}) {
    const [name,setname]=useState('');
    const [image,setimage]=useState();
    const [select,setSelect]=useState('#2970ff');
    const [profileimgYes,setProfileimgYes]=useState(false);
    useEffect(() => {
        if (isModalProfileOpen) {
            document.body.style.overflow = 'hidden';
            setname(userDetails.name);
        } else {
            document.body.style.overflow = 'auto';
        }
    
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalProfileOpen]);
    ///////////////////////////////////////////
  return (
    <>
       {isModalProfileOpen && <div className={"modal"}>
            <div className='modal-content'>
           <p style={{fontWeight:600,textAlign:'center'}}>Edit Profile</p>
        <Input label={'Your Name'} type={'text'} state={name} setstate={setname} />
        <p style={{fontSize:'0.8rem',padding:'5px 0px'}}>Change Profile Picture??</p>
        {profileimgYes && <>
        <input style={{width:'100%',padding:'3px',margin:'5px 0px',backgroundColor:'white',borderRadius:'4px',border:'1px solid black'}} id='file-input' type={'file'} placeholder={'Select Image'} onChange={(e)=>setimage(e.target.files[0])} /></>}
        <div style={{display:'flex',paddingTop:'5px',gap:'10px'}}><Button onclick={()=>setProfileimgYes(true)} text={'Yes'} blue={true}/>
        <Button onclick={()=>setProfileimgYes(false)} text={'No'}/>
        </div>
        <br/>
        <label style={{fontSize:'0.8rem'}} htmlFor='profile-select'>Select Theme Color</label><br/>
        <select style={{width:'100%',padding:'5px',margin:'5px 0px',backgroundColor:'white',borderRadius:'4px',border:'1px solid black'}} onChange={(e)=>{setSelect(e.target.value)}} value={select} id='profile-select'>
            <option value={'#2970ff'} style={{color:'#2970ff'}}>Default Blue</option>
            <option value={'#6a1f0a'} style={{color:'#6a1f0a'}}>Deep Red</option>
            <option value={'#087a72'} style={{color:'#087a72'}}>Dark Green</option>
            <option value={'#7878cb'} style={{color:'#7878cb'}}>Light Violet</option>
            <option value={'green'} style={{color:'green'}}>Regular Green</option>
        </select>
        <p style={{fontSize:'0.8rem',padding:'5px 0px'}}>Note:Click to Edit Field</p>
        <Button blue={true} text={loadprofile?'Loading...':"Update"} onclick={async()=>{
            //console.log(image);
            let imagesrc;
            if (profileimgYes) {   
                if(image){
                const reader=new FileReader();
                 reader.readAsDataURL(image);
                 reader.onload =async function(e) {
                     imagesrc= e.target.result;
                     setimage(null);
                     if (name!='') {
                             await updateProfileDetails({name:name,photoURL:imagesrc,themeColor:select});
                            }else{
                             toast.error('All fields are required!!');
                                 }
            }}else{
                toast.error('Image field is required!!');
                             toast.info('Select \'No\' to cancel Image Update');
                             return;
            }}else{
                if(name!=''){await updateProfileDetails({name:name,themeColor:select});
                }else{
                toast.error('All fields are required!!');
                     }
            }
           
            setprofileModalOpen(false);

        }}/>
         <Button  text={"Cancel"} onclick={()=>setprofileModalOpen(false)} />
            </div>
            </div>}</>
  )
}

export default ProfileModal