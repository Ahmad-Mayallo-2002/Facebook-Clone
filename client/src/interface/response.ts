export interface LoginRes {
  login: {
    token: string;
  };
}

export interface VerifyCodeRes {
  verifyCode: string
}