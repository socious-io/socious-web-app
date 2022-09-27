export interface FindChatBodyType {
  participants: string[];
}

export interface CreateChatBodyType {
  name: string;
  description?: string;
  type: 'CHAT' | 'GROUP' | 'CHANNEL';
  participants: string[];
}
