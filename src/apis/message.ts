import { MessageCreateDto, MessageReadDto } from 'types/MessageAPI';

import client from 'apis/client';

import { AxiosResponse } from 'axios';

export const messageAPI = {
  createMessage: async (text: string) => {
    const response = await client<
      MessageReadDto,
      AxiosResponse<MessageReadDto, MessageCreateDto>,
      MessageCreateDto
    >({
      url: '/messages',
      method: 'POST',
      data: { message: text },
    })
      .then((result) => {
        return result.data;
      })
      .catch();
    return response;
  },
  getMessages: async () => {
    const response = await client<MessageReadDto[]>({
      url: '/messages',
      method: 'GET',
    })
      .then((result) => {
        return result.data;
      })
      .catch(() => alert('Fail to load messages.'));
    return response;
  },
};
