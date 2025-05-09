import {
  DiaryResponse,
  DiaryResponseList,
  PostDiaryRequest,
  QType,
} from "./diary.type";
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

export const getDiaryList = async (
  qtype: QType
): Promise<DiaryResponseList> => {
  try {
    const response = await instance.get<DiaryResponseList>(
      `/api/diary/qtype/${qtype}`
    );
    return response.data;
  } catch (error) {
    console.error("일기 조회 실패", error);
    throw error;
  }
};
