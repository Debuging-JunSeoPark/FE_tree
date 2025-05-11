import instance from "./instance";
import { UserProfile, UpdateProfile} from "./user.type";

export const putUserProfile = async (
  data: UpdateProfile
): Promise<UpdateProfile> => {
  {
    try {
      const response = await instance.put<UpdateProfile>(
        "/api/user/profile",
        data
      );
      return response.data;
    } catch (error) {
      console.error("유저 프로필 수정 실패", error);
      throw error;
    }
  }
};

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await instance.get<UserProfile>("/api/user/me");
    return response.data;
  } catch (error) {
    console.error("사용자 정보 조회 실패", error);
    throw error;
  }
};

