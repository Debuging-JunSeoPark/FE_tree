import { EmailRegister } from "./auth.type";
import instance from "./instance";

export const postEmailRegister = async (
  email: string
): Promise<EmailRegister> => {
  try {
    const response = await instance.post<EmailRegister>("/api/auth/register", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("이메일 등록 실패", error);
    throw error;
  }
};
