import React from 'react'
import './style.css'
import { Card, Row} from 'antd';
import Button from '../Button';
function Cards({setResetModalVisible,income,expense,totalBalance,showIncomeModal,showExpenseModal}) {
  return (
    <div>
    
      <Row className='my-row'>
        <Card className='my-card' title='Current Balance'>
            <p>₹{totalBalance}</p>
         <Button onclick={()=>setResetModalVisible(true)} text='Reset Balance' blue={true}/>
        </Card>
        <Card className='my-card' title='Total Income'>
            <p>₹{income}</p>
         <Button onclick={showIncomeModal} text='Add Income' blue={true} />
        </Card>
        <Card className='my-card' title='Total Expense'>
            <p>₹{expense}</p>
         <Button onclick={showExpenseModal} text='Add Expense' blue={true} />
        </Card>
        </Row>
    </div>
  )
}

export default Cards