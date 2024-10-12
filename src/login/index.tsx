import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toLogin } from '@/http/axios'
import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input, Alert, message } from 'antd'

type FieldType = {
  name?: string
  password?: string
  remember?: string
}

export default function Login () {
  const [code, setCode] = useState<number>()
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    const res = await toLogin({
      name: values.name as string,
      password: values.password as string
    })
    setCode(res.code)
    if (res.code !== 200) {
      message.open({
        type: 'error',
        content: res.message
      })
    } else {
      message.open({
        type: 'success',
        content: res.message
      })
      navigate('/')
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gray-50'>
      <div className='z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl'>
        <div className='flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16 mb-7'>
          <h3 className='text-xl font-semibold'>Sign In</h3>
          <p className='text-center text-sm text-gray-600'>
            {"Don't have an account? "}
            <Link to='/register' className='font-semibold text-gray-800'>
              Sign up
            </Link>
            {' for free.'}
          </p>
        </div>
        <div className=' p-4'>
          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item<FieldType>
              label='Name'
              name='name'
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label='Password'
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name='remember'
              valuePropName='checked'
              wrapperCol={{
                xs: { offset: 8, span: 16 },
                lg: { offset: 8, span: 16 }
              }}
              style={{ textAlign: 'right' }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {code === 401 ? (
              <Form.Item>
                <Alert message='Invalid Password' type='error' />
              </Form.Item>
            ) : code === 404 ? (
              <Form.Item>
                <Alert
                  message={
                    <p>
                      User not found{' '}
                      <Link
                        to='/register'
                        className='font-semibold text-gray-800'
                      >
                        Sign up
                      </Link>
                      <span> for free</span>
                    </p>
                  }
                  type='error'
                />
              </Form.Item>
            ) : null}

            <Form.Item
              style={{ textAlign: 'right' }}
              wrapperCol={{
                xs: { offset: 8, span: 16 },
                lg: { offset: 8, span: 16 }
              }}
            >
              <Button type='primary' htmlType='submit'>
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
