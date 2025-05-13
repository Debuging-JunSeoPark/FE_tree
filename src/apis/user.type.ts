export interface UserProfile {
  nickname: string;
  avatar: string;
  email?: string;
}

export interface UpdateProfile {
  nickname: string;
  avatar: string;
}
