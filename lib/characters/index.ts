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
    avatarFrom?: string | undefined;
    background: string;
    backgroundFrom?: string | undefined;
  };
}

export const characters: Character[] = [...january];
