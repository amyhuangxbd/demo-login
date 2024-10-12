export type IUser = {
  name?: string;
  password?: string;
};
export function getUsers(): IUser[] {
  let res = [];
  try {
    res = JSON.parse(localStorage.getItem("users") ?? "[]");
  } catch (error) {
    console.error(error);
  }
  return res;
}

export function getLoginStatus() {
  let res: IUser = {};
  try {
    res = JSON.parse(localStorage.getItem("loginStatus") ?? "{}");
    const users: IUser[] =
      JSON.parse(localStorage.getItem("users") ?? "") ?? [];
    const user = users.find((u) => u.name === res.name);
    if (user) {
      return res;
    } else {
      res = {};
    }
  } catch (error) {
    console.error(error);
  }
  return res;
}
