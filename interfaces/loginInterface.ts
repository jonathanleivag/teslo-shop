// Generated by https://quicktype.io

export interface ILoginData {
  data: {
    data: {
      login: ILogin
    }
  }
}

export interface ILogin {
  user: User
  token: string
  message: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}
