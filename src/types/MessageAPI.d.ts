export interface MessageCreateDto {
  message: string;
}

export interface MessageReadDto {
  id: number;
  createdAt: string;
  location: string;
  code: string;
}
