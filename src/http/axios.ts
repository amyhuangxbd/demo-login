import axios from "axios";
import './mock'
import { IUser, getLoginStatus } from '@/utils'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.token = token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 用户登录
export async function toLogin({name, password}: Required<IUser>) {
    const res = await axios.post('/api/login', {
        name,
        password
      })
    localStorage.setItem("loginStatus", JSON.stringify(res.data))
    return res.data
}
  
// 用户注册示例
export async function toRegister({ name, password }: Required<IUser>) {
    const res = await axios.post('/api/register', {
        password,
        name,
    })
    return res.data;
    // .then(response => {
    //     console.log('Register Response:', response.data);
    // })
    // .catch(error => {
    //     console.error('Error during registration:', error);
    // });
}
// axios.post('/api/register', {
//         password: 'new_password',
//         name: 'New User',
//     })
//     .then(response => {
//         console.log('Register Response:', response.data);
//     })
//     .catch(error => {
//         console.error('Error during registration:', error);
//     });

// 查询用户信息示例
export async function getLoginInfo() {
    const res = await axios.get('/api/user');
    return res.data;
}

// 查询用户登录状态
export function queryLoginStatus() {
    const res = getLoginStatus()
    if (res.name) {
        return true
    }
    return false;
}
// axios.get('/api/user')
//     .then(response => {
//         console.log('User Query Response:', response.data);
//     })
//     .catch(error => {
//         console.error('Error during user query:', error);
//     });
