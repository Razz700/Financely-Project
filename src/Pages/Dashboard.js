import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Card'
import AddExpenseModal from '../components/Modal/AddExpenseModal';
import AddIncomeModal from '../components/Modal/AddIncomeModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from '../firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TransactionTable from '../components/TransactionTable';
import ChartComponent from '../components/Charts';
import NoTransaction from '../components/NoTransaction';
import { doc,deleteDoc, updateDoc } from "firebase/firestore";
import ResetModal from '../components/CustomModal/ResetModal';


function Dashboard() {
  const [user]=useAuthState(auth);
  const navigate=useNavigate();
  const [loading,setloading]=useState(false);
  const [transactions,settransactions]=useState([]);
  const [isIncomeModalVisible,setIsIncomeModalVisible]=useState(false);
  const [isExpenseModalVisible,setIsExpenseModalVisible]=useState(false);
  const [isResetModalVisible,setResetModalVisible]=useState(false);
  const [income,setIncome]=useState(0);
  const [expense,setExpense]=useState(0);
  const [totalBalance,setTotalBalance]=useState(0);
  const showIncomeModal=()=>{
    setIsIncomeModalVisible(true);
  }
  const showExpenseModal=()=>{
    setIsExpenseModalVisible(true);
  }
  const handleExpenseModalCancel=()=>{
    setIsExpenseModalVisible(false);
  }
  const handleIncomeModalCancel=()=>{
setIsIncomeModalVisible(false);
  }
  //////////////////////////////////////////////////
  function onFinish(values,type){
//console.log('Done!',values,type);
//console.log('again done',values.date.$d);
const newTransaction={
  type:type,
  date:values.date.format('YYYY-MM-DD'),
  amount:parseFloat(values.amount),
  tag:values.tag,
  name:values.name
};
addtransaction(newTransaction);
setIsExpenseModalVisible(false);
setIsIncomeModalVisible(false);
  }
  ///////////////////////////////////////////////////
 async function addtransaction(transaction,many){
  try{
//const docRef=
await addDoc(
  collection(db,`users/${user.uid}/transactions`),
  transaction);
//console.log('document writted with id',docRef.id);
if(!many)toast.success('Transaction Added!');
settransactions(transactions=>[...transactions,transaction]);
  }catch(e){
console.log('Error adding a Doc',e);
if(!many)toast.error("Couldn't add transaction!");
  }
 }
 ///////////////////////////////////////////////
 useEffect(()=>{
//Get all transactions from firebase and store in transaction useState variable
if (!user) {
  navigate('/');
}else{
  fetchTransactions();
}
 },[]);
//////////////////////////////////////////////////////
 useEffect(()=>{
calculateBalance(transactions);
 },[transactions]);
 ////////////////////////////////////////
 async function updateDetailsForProfilepage(income,expense,transactionsLength) {
  if(!user)return;
const useref=doc(db,"users", user.uid);
 try{
  await updateDoc(useref, {
    income:income,
    expense:expense,
    transactionsCount:transactionsLength
 });
 }catch(e){
console.log(e);
 }
 }
 //////////////////////////////////////////////
 useEffect(()=>{
  updateDetailsForProfilepage(income,expense,transactions.length);
 },[income,expense,transactions.length]);
//////////////////////////////////////////
 function calculateBalance(transactions){
let incomeTotal=0;
let expenseTotal=0;
transactions.forEach((transaction)=>{
if (transaction.type==='income') {
  incomeTotal+=transaction.amount;
}else{
  expenseTotal+=transaction.amount;
}
});
setIncome(incomeTotal);
setExpense(expenseTotal);
setTotalBalance(incomeTotal-expenseTotal);
 }
//////////////////////////////////////////////////////
async function fetchTransactions(){
setloading(true);
if (user) {
  const q=query(collection(db,`users/${user.uid}/transactions`));
  const querysnapshot=await getDocs(q);
  let transactionsArray=[];
  querysnapshot.forEach((doc)=>{
    transactionsArray.push(doc.data());
  });
  settransactions(transactionsArray);
 // console.log('transaction array',transactionsArray);
  toast.success('Transactions Fetched!');
}
setloading(false);
 }
 ////////////////////////////////////////////////////////
 async function ResetAllTransactions(){
  setloading(true);
try{
  const q=query(collection(db,`users/${user.uid}/transactions`));
  const querySnapshot = await getDocs(q);
  const docIds = querySnapshot.docs.map(doc => doc.id);
  console.log('Filtered Document IDs:', docIds);
 for(const docid of docIds){
  const docRef = doc(db, `users/${user.uid}/transactions`, docid);
  await deleteDoc(docRef);
 }
  settransactions([]);
  toast.success('Transaction Deleted!');
  setloading(false);
}catch(e){
  toast.error(e.message);
  setloading(false);
}
 }
 ////////////////////////////////////////////
 async function deleteTransaction(item){
try{
  const q=query(collection(db,`users/${user.uid}/transactions`),where('name', '==', item.name),
  where('amount', '==', item.amount),
  where('tag', '==', item.tag),
  where('type', '==', item.type),
  where('date', '==', item.date));
  const querySnapshot = await getDocs(q);
  const docIds = querySnapshot.docs.map(doc => doc.id);
  //console.log('Filtered Document IDs:', docIds);
  const transactionRef = doc(db, `users/${user.uid}/transactions`, docIds[0]);
  await deleteDoc(transactionRef);
  settransactions(transactions=>{
    const newarr=transactions.filter((elem)=>elem.name!==item.name || elem.type!==item.type || elem.tag!==item.tag || elem.date!==item.date || elem.amount!==item.amount);
  return newarr;
  });
  toast.success('Transaction Deleted!');
}catch(e){
  toast.error(e.message)
}
 }
 ///////////////////////////////////////////////
 async function editTransaction(oldvalue,newvalue){
console.log('edited',oldvalue,newvalue);
try{
  const q=query(collection(db,`users/${user.uid}/transactions`),where('name', '==', oldvalue.name),
  where('amount', '==', oldvalue.amount),
  where('tag', '==', oldvalue.tag),
  where('type', '==', oldvalue.type),
  where('date', '==', oldvalue.date));
  const querySnapshot = await getDocs(q);
  const docIds = querySnapshot.docs.map(doc => doc.id);
  //console.log('Filtered Document IDs:', docIds);
  const transactionRef = doc(db, `users/${user.uid}/transactions`, docIds[0]);
  await updateDoc(transactionRef, {...newvalue});
  settransactions(transactions=>{
    const newarr=transactions.map((elem)=>{if(elem.name!==oldvalue.name || elem.tag!==oldvalue.tag || elem.date!==oldvalue.date || elem.amount!==oldvalue.amount){
      return elem;
    }else{
      return {...newvalue,type:oldvalue.type}
    }
  });
  return newarr;});
  toast.success('Transaction Updated!');
}catch(e){
  toast.error(e.message);
}
 }
 //////////////////////////////////////////////////
  return (
  <div>
      <Header/>
      {user && loading?(<p>Loading...</p>):(<>
        <Cards
        income={income}
        expense={expense}
        totalBalance={totalBalance} 
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        setResetModalVisible={setResetModalVisible}
         />
        {transactions.length!==0?<ChartComponent transactions={transactions} />:<NoTransaction/>} 
      <AddIncomeModal 
       isIncomeModalVisible={isIncomeModalVisible}
       handleIncomeModalCancel={handleIncomeModalCancel}
       onFinish={onFinish} />
     <AddExpenseModal isExpenseModalVisible={isExpenseModalVisible}
     handleExpenseModalCancel={handleExpenseModalCancel}
     onFinish={onFinish}
      />
      <ResetModal loading={loading} ResetAllTransactions={ResetAllTransactions} isResetModalVisible={isResetModalVisible} setResetModalVisible={setResetModalVisible} />
      
      <TransactionTable transactions={transactions} addtransaction={addtransaction} deleteTransaction={deleteTransaction} editTransaction={editTransaction} />
      </>)}
  </div>
  
  )
}

export default Dashboard