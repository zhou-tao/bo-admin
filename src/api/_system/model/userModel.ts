import { PostModel } from './postModel'
import { RoleModel } from './roleModel'

export interface UserInfoModel {
  name: string
  userId: number
  username: string
  deptCode: Nullable<string>
  deptName: Nullable<string>
  mobile: Nullable<string>
  posts: PostModel[]
  roles: RoleModel[]
}
