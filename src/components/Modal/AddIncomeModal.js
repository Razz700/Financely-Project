import React from 'react'
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'

function AddIncomeModal({isIncomeModalVisible,handleIncomeModalCancel,onFinish}) {
  const [form]=Form.useForm();
  return (
   <Modal
   style={{fontWeight:600, fontFamily: `"Montserrat", sans-serif !important`}}
    title="Add Income"
    open={isIncomeModalVisible}
    onCancel={handleIncomeModalCancel}
    footer={null}>
<Form
    form={form}
    layout='vertical'
    onFinish={(values)=>{
onFinish(values,'income');
form.resetFields();
    }}>
<Form.Item
style={{fontWeight:600}}
label="Name"
name='name'
rules={[{required:true,
  message:'Please Input the name of the transaction!'}
]}>
<Input type='text' className='custom-input' />
</Form.Item>
<Form.Item
style={{fontWeight:600}}
label="Amount"
name='amount'
rules={[{required:true,
  message:'Please Input the Income Amount!'}
]}>
<Input type='number' className='custom-input' />
</Form.Item>
<Form.Item
style={{fontWeight:600}}
label="Date"
name='date'
rules={[{required:true,
  message:'Please select the Income date!'}
]}>
<DatePicker className='custom-input' format='YYYY-MM-DD' />
</Form.Item>
<Form.Item
style={{fontWeight:600}}
label="Tag"
name='tag'
rules={[{required:true,
  message:'Please select a tag!'}
]}>
<Select className='select-input-2'>
<Select.Option value='salary'>Salary</Select.Option>
<Select.Option value='freelance'>Freelance</Select.Option>
<Select.Option value='investment'>Investment</Select.Option>
<Select.Option value='others'>Others</Select.Option>
</Select>
</Form.Item>
<Form.Item>
<Button className='btn btn-blue' type='primary' htmlType='submit'>Add Income</Button>
</Form.Item>
    </Form>
   </Modal>
  )
}

export default AddIncomeModal