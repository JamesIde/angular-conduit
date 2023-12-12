


export interface AuthSuccess {
  token: string
  user: User
}

export interface User {
  id: string
  email: string
  name: string
  username: string
  bio: string
  image: string
}
