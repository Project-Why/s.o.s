import { MessageCreateDto, MessageReadDto } from 'types/MessageAPI';

import client from 'apis/client';

import { AxiosResponse } from 'axios';

export const messageAPI = {
  getConnection: async () => {
    await client({
      url: '/health',
      method: 'GET',
    })
      .then(() => {})
      .catch(() => {});
  },

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
      .catch(() => {});
    return response;
  },
  getMessages: async (count?: number) => {
    const response = await client<MessageReadDto[]>({
      url: '/messages',
      method: 'GET',
      params: {
        count,
      },
    })
      .then((result) => {
        return result.data;
      })
      .catch(() => {});
    return response;
  },
};
