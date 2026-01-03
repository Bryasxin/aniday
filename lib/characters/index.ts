import january from "./january";

export interface Character {
  name: string;
  from: string;
  birthday: {
    month: number;
    day: number;
  };
  assets: {
    avatar: string;
    avatarFrom?: string;
    background: string;
    backgroundFrom?: string;
  };
  extraContent: string[];
}

export const characters: Character[] = [...january];
