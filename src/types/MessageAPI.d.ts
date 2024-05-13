export interface MessageCreateDto {
  message: string;
}

export interface MessageReadDto {
  id: number;
  createdAt: Date;
  location: string;
  code: string;
}
