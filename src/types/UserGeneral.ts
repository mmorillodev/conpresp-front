export interface UserGeneral {
  id: string
  firstName: string
  lastName: string
  email: string
  profile: string
  status: string
}

export interface UserDetails {
  id: string
  profile: string
  userGroup: string
  firstName: string
  lastName: string
  email: string
  status: string
  createdBy: string
  createdAt: string
  updatedAt: string
  updatedBy: string
}
