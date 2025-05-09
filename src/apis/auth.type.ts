export interface CheckEmailResponse {
  email: string;
}


// 인증 코드 검증 요청
export interface VerifyEmailCodeRequest {
  email: string;
  code: string;
}

export interface VerifiedSignupRequest {
  email: string;
  code: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  profileComplete: boolean;
}
