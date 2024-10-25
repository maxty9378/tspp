export interface User {
  id: number;
  name: string;
  photoUrl: string;
  role: 'organizer' | 'participant';
  coins: number;
  telegramId: string;
}

export interface Message {
  id: number;
  userId: number;
  text: string;
  timestamp: string;
  chatType: 'organizer' | 'participant';
}

export interface ScheduleItem {
  id: number;
  time: string;
  title: string;
  description: string;
  speaker?: string;
  type: 'speech' | 'break' | 'lunch';
}

export interface Test {
  id: number;
  title: string;
  questions: {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
  }[];
  rewardCoins: number;
}