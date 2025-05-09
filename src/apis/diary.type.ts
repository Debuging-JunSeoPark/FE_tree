export type QType = "morning1" | "lunch1" | "dinner1";

export interface PostDiaryRequest {
  qtype: QType;
  diary: string; // JSON.stringify 된 DiaryContent
}
export interface DiaryResponse {
  diaryId: number;
  userId: number;
  qtype: QType;
  diary: string; // 나중에 JSON.parse로 DiaryContent 타입으로 파싱 가능
  createdAt: string;
  updatedAt: string | null;
}
