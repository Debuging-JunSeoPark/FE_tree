import { CheckEmailResponse ,VerifyEmailCodeRequest, VerifiedSignupRequest,LoginRequest, LoginResponse  } from "./auth.type";
import instance from "./instance";

export const postCheckEmail = async (
  email: string
): Promise<CheckEmailResponse> => {
  try {
    const response =await instance.post("/api/auth/check-email", null, {
      params: { email }
    });
    
    return response.data;
  } catch (error) {
    console.error("이메일 체크 실패", error);
    throw error;
  }
};

// 인증 코드 검증 요청
export const postVerifyEmailCode = async (
  data: VerifyEmailCodeRequest
): Promise<void> => {
  await instance.post("/api/auth/verify-email-code", data);
};


//회원가입
export const postVerifiedSignup = async (
  data: VerifiedSignupRequest
): Promise<void> => {
  try {
    await instance.post("/api/auth/verified-signup", data);
  } catch (error) {
    console.error("회원가입 실패", error);
    throw error; 
  }
};

//로그인
export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await instance.post<LoginResponse>("/api/auth/login", data);
  return response.data;
};