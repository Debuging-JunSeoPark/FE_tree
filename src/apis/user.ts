import instance from "./instance";
import { UserProfile } from "./user.type";

export const putUserProfile = async (
  data: UserProfile
): Promise<UserProfile> => {
  {
    try {
      const response = await instance.put<UserProfile>(
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
