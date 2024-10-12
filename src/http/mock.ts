import Mock from "mockjs";
import { getUsers, IUser } from "@/utils";

// 用户登录接口
Mock.mock("/api/login", "post", (options) => {
  const { name, password } = JSON.parse(options.body);
  const users = getUsers();
  const user = users.find((u) => u.name === name && u.password === password);

  if (user) {
    const data = {
      name: user.name,
      token: Mock.Random.guid(),
    };

    return {
      code: 200,
      message: "Login successful",
      data,
    };
  } else {
    const user = users.find((u) => u.name === name);
    if (user) {
      // 401 Unauthorized
      return {
        code: 401, // INVALID_PASSWORD
        message: "Invalid password",
      };
    } else {
      // 404 Not Found
      return {
        code: 404, // USER_NOT_FOUND
        message: "User not found",
      };
    }
  }
});

// 用户注册接口
Mock.mock("/api/register", "post", (options) => {
  const { password, name }: IUser = JSON.parse(options.body);
  const users = getUsers();
  const userExists = users.some((u) => u.name === name);

  if (userExists) {
    return {
      code: 409,
      message: "Username already exists",
    };
  } else {
    users.push({ password, name });
    localStorage.setItem("users", JSON.stringify(users));
    return {
      code: 201,
      message: "Registration successful",
      data: { name },
    };
  }
});

// 查询登录接口
Mock.mock("/api/user", "get", () => {
  const users = getUsers();
  return {
    code: 200,
    message: "Query successful",
    data: users.map((user) => ({
      name: user.name,
    })),
  };
});
