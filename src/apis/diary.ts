import { DiaryResponse, PostDiaryRequest } from "./diary.type";
import instance from "./instance";

export const postDiary = async (
  data: PostDiaryRequest
): Promise<DiaryResponse> => {
  try {
    const response = await instance.post<DiaryResponse>("/api/diary", data);
    return response.data;
  } catch (error) {
    console.error("일기 전송 실패", error);
    throw error;
  }
};
