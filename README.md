# 题目
## 面试题目1：
做一个登录注册的DEMO界面
- 1.用户界面设计
登录页面：包含用户名/密码输入框，以及登录、记住我和注册按钮。
注册页面：包含用户名/密码/确认密码。
响应式设计：确保页面在不同设备（如桌面、平板、手机）上都能良好显示。
- 2.前端技术栈
前端框架：React
UI库: antd
代码规范: eslint,husky,prettier
样式框架：Tailwind CSS,unocss等
- 3.数据验证。前端验证：实时检查输入是否符合格式要求，如邮箱格式、密码强度等。
- 4.Mockjs 所有接口都使用mockjs
  
## 思路
根据题意需要开发两个页面
- 登录页面：包含用户名/密码输入框，以及登录、记住我和注册按钮。
- 注册页面：包含用户名/密码/确认密码。
要求：
1. **页面路由**：多个页面，我们需要用到路由、Form表单、页面请求、鉴权，
2. **响应式设计**：可以使用媒体查询（Media Queries）、弹性布局、百分比和视口单位
3. **接口请求**：登录接口、注册接口
4. **数据验证**：需要对用户名的长度、密码强度校验
5. **技术栈**：根据题目需要使用
   - Dependency: React及其生态系统、antd、Tailwind CSS、Mockjs
   - devdependency: eslint, prettier, postcss, husky, lint-staged等
  
### 登录页面
- Form表单，含有username, password字段
- 需要跳转注册链接



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
