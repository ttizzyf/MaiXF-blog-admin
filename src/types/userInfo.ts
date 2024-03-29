// 邮箱验证码
export interface userEmail {
  email: string;
}

// 用户信息
export interface GenerateThemeColor extends userEmail {
  userId: Number; // 用户id
  nickname: string; // 用户昵称
  status: Number; //用户状态
  avatar: string; //用户头像
  website: string; // 用户站点
  platform: string; //用户平台
}
// 用户登录
export interface userLogin extends userEmail {
  password: string;
  code: number | null;
}
// 用户注册
export interface userRegister extends userEmail {
  password: string;
  emailCode: number | null;
  nickname?: string;
  website?: string;
}

// 修改用户信息
export interface emitUserInfo {
  email?: string;
  nickname?: string;
  avatar?: string | null;
  website?: string | null;
}
