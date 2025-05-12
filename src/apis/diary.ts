import {
  DiaryItem,
  DiaryListResponse,
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

export const getPeriodDiary = async (
  start: string,
  end: string
): Promise<DiaryListResponse> => {
  try {
    const response = await instance.get<DiaryListResponse>(
      "/api/diary/period",
      {
        params: { start: start, end: end },
      }
    );
    return response.data;
  } catch (error) {
    console.error("기간별 일기 조회 실패", error);
    throw error;
  }
};

export const putTodayDiary = async (
  diaryId: number,
  data: PostDiaryRequest
): Promise<DiaryItem> => {
  try {
    const response = await instance.put<DiaryItem>(
      `/api/diary/${diaryId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("일기 수정 실패", error);
    throw error;
  }
};
