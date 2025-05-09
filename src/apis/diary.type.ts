export type QType = "morning1" | "lunch1" | "dinner1";
export interface DiaryContent {
  content: string;
}
export interface PostDiaryRequest {
  //다이어리 전송
  qtype: QType;
  diary: string; // JSON.stringify 된 DiaryContent
}
export interface DiaryResponse {
  //전송한 다이어리 응답 타입
  diaryId: number;
  userId: number;
  qtype: QType;
  diary: string; // 나중에 JSON.parse로 DiaryContent 타입으로 파싱 가능
  createdAt: string;
  updatedAt: string | null;
}

export type DiaryResponseList = DiaryResponse[]; //질문 유형별 다이어리 조회
