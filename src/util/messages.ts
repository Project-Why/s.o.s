import { MessageReadDto } from 'types/MessageAPI';

export const truncateTextByBytes = (
  inputText: string,
  byteLimit: number,
): string => {
  const truncatedText = inputText.split('').reduce(
    (acc, char) => {
      const charByteSize = new Blob([char]).size;
      const newByteCount = acc.byteCount + charByteSize;

      if (newByteCount > byteLimit) {
        return acc;
      }

      return {
        byteCount: newByteCount,
        text: acc.text + char,
      };
    },
    { byteCount: 0, text: '' },
  );

  return truncatedText.text;
};

export const hardMessages: MessageReadDto[] = [
  {
    id: 2,
    code: '..-..- -.---. ...... -.-... ..-... -.---. .....- ....-. -.--.. ....-- ..-... -...-. .....- .....- -..-.- ..-... ..--.. .....- -...-. .....- -.--.. .....- ..-..- -...-. .....- ..-... -...-. ..-... .-.... -.---- ..-... ...--- -..-.. ..-... ..-... --...- ...--- -..-.. .....- -..-.. .-.... ------ ....-- -.--.. ....-- ..-..- -..-.. ..-... ...--. -..--. ...... .-.... -...-. ....-- -..-.. ..-... --.-.. .-.--. ....-. -...-. .-.-.-',
    createdAt: '2024-07-07 11:12:20.665121',
    location: 'KOR',
  },
  {
    id: 9,
    code: '.-.... -...-. ..-... -.---.',
    createdAt: '2024-08-11 03:45:53.499408',
    location: 'KOR',
  },
  {
    id: 10,
    code: '..-... -.---. ....-- .-.--- -.---. ...... -...-. ...-.. .-.--- -.---. ..-..- -...-. ...--- -.---. .....- ...... --.-.. ...... -...-. ..---. ..-... -.--.. .....- ...--. -.-... ....-- -.-..- ..-... ------ ...--- -...-. ....-- -...-. ...-.. ..-... -.---. ....-- -...-. .....- -.--.. .....- ...... -..-.. ...--- ..-... -.--.. ....-- .-...- -.---- ....-. -...-. ....-- ..-... -...-. .-.--. ...... -.---. .-..-- -.---- ...-.. -.-... .....- ..-... --...- --..-- ....-. -..-.. ..-... -.---. ...--- -...-. ..-... ....-. -...-. ...... -...-. ...... -...-. ...-.. -..-.- .....- ..-... -...-. .....- ....-. --.--. .....- ....-. -...-. ...... -..--. ...--- -.---- ..-... ...... -...-. ...... .-.... -.---- .-.--. ....-. -...-. .-.-.-',
    createdAt: '2024-08-20 06:07:01.855845',
    location: 'KOR',
  },
  {
    id: 11,
    code: '....-. -...-. .....- .-.... -...-. .....- ...... -...-. ..-..- -.---. ...... -..-.. ..-..- -.---. ...--- ....-. --.--. ..-..- -.---. ..-... -...-. .--.-- .....- -.--.. .....- ...--- -...-. ...... -..--. .....- -.--.. .....- ...... -.---. ....-. -.---- .-.... -...-. ..-..- -.---. ..-... -...-. .--.-- .....- -.--.. .....- .----. ...--. -.-... ....-- ...-.. -..--. ..-... ------ ...--- -...-. ...... -..--. .----. ....-. -...-. .-.-.-',
    createdAt: '2024-08-20 06:13:01.782370',
    location: 'KOR',
  },
  {
    id: 12,
    code: '...... -...-. ...-.. -...-. .....- .-.... -.---. ...-.. -..-.. ...-.. ..-.-. --.--- ..-... -.---. .-.--. .....- -.--.. .....- ...... --...- ..-... -...-. .....- -.---. ...... -.-... .....- -...-. --..-- ..-.-. -.---. ...-.. ..-... -.--.. .....- .-..-- -...-. ...... ..-... -...-. ....-- ...-.. -...-. ..-..- ...... --...- ..-... -.-... ...-.. ..-..- -.---. ...... ..-... -.---. ...... -..--. ..-... -.---. .-.--. ....-. -...-. .-.-.- .....- -...-. ..-... --...- ...... --...- .....- ..-... -..-.. -..... .....- -.--.. .....- ...... -.--.. ..-..- -..-.. ...... ....-. -...-. ..-... .-.... -...-. ...-.. ..-... -.---. .....- -.---- ...--- -.---. ...-.. ...--. -.-... ....-- -..-.. ..-... --.--- .-.--. ....-. -...-. .-.-.-',
    createdAt: '2024-08-20 06:26:44.060788',
    location: 'KOR',
  },
  {
    id: 14,
    code: '.....- -.---- .-...- -.-... ...-.. ..-... -.--.. .....- ...-.. -.-... ..-... -..-.. ...--- ..-... -.---. ..-... -..-.. .-.--. .....- -.--.. .....- ...... -...-. ..--.. ...--- -.---- ..-... ..-..- -..--. .....- ..-... --...- ...--. -...-. .-.-.. -...-. ..-... -.---. ..-..- ..-... -..-.. .-.--. ....-. -...-. .-.-.-',
    createdAt: '2024-08-22 04:38:59.593330',
    location: 'KOR',
  },
  {
    id: 15,
    code: '.-- . --. --- -. -. .- -... . --- -.- .- -.-- .-.-.-',
    createdAt: '2024-08-26 13:54:25.182097',
    location: 'KOR',
  },
  {
    id: 16,
    code: '.. .--. ..- - -- -.-- .... .- -. -.. --- -. - .... . ... - --- ...- . --..-- - --- ... . . .. ..-. .. ... - .. .-.. .-.. -... .-.. . . -.. .-.-.-',
    createdAt: '2024-08-27 04:45:40.955499',
    location: 'KOR',
  },
  {
    id: 17,
    code: '...... -..-.. ...... -.---. ..-... -...-. ...-.. -.-... ....-. -..--. ..-... -..-.. -..... .....- -...-. ..-... -..--- ..--..',
    createdAt: '2024-08-27 04:50:22.709151',
    location: 'KOR',
  },
  {
    id: 18,
    code: '...... -...-. .-...- -.--.. ...-.. ..-... -.--.. .....- .....- -..-.. ..-... --.-.. .....- -.---- ...... -...-. ...-.. -...-. ....-- ..-... -.---. ..---. -..--. ..-... .-.... -...-. .....- -.--.. .....- ...... --...- ..-... -.---. ...--- -...-. ..-... .-.... -.----',
    createdAt: '2024-08-31 05:15:15.492223',
    location: 'KOR',
  },
  {
    id: 19,
    code: '...... -.--.. .....- -..-.- .....- -.--.. .....- .....- -...-. ..-... --...- ...... --...- ..-..- -...-. ...... -.---. ....-- -.--.. ....-- ...--- -...-. ....-- -...-. ..-... .-.... -...-. .....- -.--.. .....- -...-- ...... -..--. ...-.. -.-... ....-- ..-... -..-.. .-.--. ....-. -...-. .-.-.- ...... -.--.. ...... -..-.. .....- ..-... -...-. ...-.. -.-... ..-... ------ ...-.. -.---. ....-. -..--. ..-... -..-.. -..... .....- -.--.. .....- ...-.. -...-. ....-- ..-... -.---. ..-..- -.---. ...-.. -...-. .....- --..-- ..-... -...-. .....- -.---. .....- ...... -..-.. ...--- ...... -...-. ..---. ....-. -...-. ...... -..--. .....- -...-. .....- -.--.. .....- ....-. -.---- ....-. -...-. ...--. .-.... -.---- .-.--. ....-. -...-. .-.-.-',
    createdAt: '2024-09-01 05:19:11.140598',
    location: 'KOR',
  },
  {
    id: 20,
    code: '.----. .-..-- -...-. ...... .-.... -...-. ...... -.---. ....-. -..--. .-.... -...-. ..-..- -.---. .-.-.- .----. .-.... -...-. ...... -..--. ...-.. -...-. ....-- .-.... -...-. ..-..- -.---. ...-.. -...-. .....- ...--- -...-. ...--- -.---. ....-- ...... -.--.. ...... -..-.. .....- ..-... -...-. ...-.. -.-... ....-. -..--. ..-... -...-. ....-- ...--- -.-... ..-... -..-.. -..... .....- -.--.. .....- ..-... -.---. ....-- ..-... -.---. ....-. -...-. .-.-.-',
    createdAt: '2024-09-01 05:20:20.887882',
    location: 'KOR',
  },
  {
    id: 21,
    code: '..-..- -.-... ...... ..-... -.--.. ...-.. ..-... -.---. ....-- -...-. .....- -.--.. .....- ..-... -.-..- ..-... -.---. ....-- .-.... -...-. .....- ...--- -.-... ...... ...-.. -..-.- ..-... ..-... -.--.. ....-- ..-..- --...- ..-... --.--. .-.... -...-. ...... -..--. .....- -.--.. .....- ...... -.---. .-.-.. -.--.. ...-.. ..-... -.---. ...... -..-.. .....- .-.... -.---- ..-... ...--. -..--. ...... ..-... -.---. ...... -..-.. .....- ...-.. -..--. ....-. -.--.. .....- ...... -..-.. ...--- ..-... -.---. ..-..- -...-. ..-... -.-..- ....-. -...-. .-.-.-',
    createdAt: '2024-09-02 05:21:01.889069',
    location: 'KOR',
  },
  {
    id: 22,
    code: '..-... -.---. ....-- ...... -...-. ...... ...--- -.-... ....-- -.--.. ....-- ..-.-. -...-. ..-..- ..-... -...-. ..-... -..--. .....- ..-... -.--.. .....- .-.... -...-. ....-- -.--.. ....-- ....-. -----. ..-..- -.---. .....- ...... -..-.. ...--- ..-... -.---. .---- ..... .....- -..-.- .....- --..-- ...--- -...-. ....-- -...-. ...-.. ....-. -.--.. ....-- ..-... -.--.. .....- ..---- -..--. ...... -.---. .-.... -...-. ....-- -...-. ...... -..--. ...-.. -...-. ....-- .-.... -...-. .....- ....-. -...-. .-.-.- .-.... -...-. ..-..- -.---. ...-.. -...-. .....- .-.-.- .-.-.- .-.-.- ..-... -.---. ...-.. -..--. ...... ..-..- -..-.. ...... ..-... -.--.. .....- .....- -...-. ..-... --...- ...... --...- ...--- -...-. .---.- ...... -.--.. ..-..- -...-. ..-.-. --...- ....-. -...-. .-.-.-',
    createdAt: '2024-09-03 05:25:13.404312',
    location: 'KOR',
  },
  {
    id: 23,
    code: '..-... -...-. .....- -.---. --..-- .....- -...-. .....- -.--.. .....- ...... -.--.. .....- -...-- ..-... ..-... -.---. ...--. ...--. -...-. .-...- ..-... --...- .-...- -..-.. .....- -.---- .-.--. ..-... -.--.. ....-- .-..-- -.---- ..-... ------ ...-.. -.---. ...... -...-. ...--- -...-. ....-- -...-. ..-..- -.---. .....- -.--.. .....- ...-.. -...-. ..-... -.--.. ...-.. ..-... -.---. ..-... -.---. .-.--. ....-. -...-. .....- -.--.. .....- ...... -..-.. ....-- ..-... -...-. ....-- .-.-.. -.-... .....- ..-... -.---. ..-... -...-- .-.-.-',
    createdAt: '2024-09-07 05:26:37.227422',
    location: 'KOR',
  },
  {
    id: 24,
    code: '-.-- --- ..- --. .. ...- . ..- ... .-- .... .- - .-- . -. . . -.. --..-- .. - -- .- -.-- -. --- - -... . .-- .... .- - .-- . .-- .- -. - .-.-.-',
    createdAt: '2024-09-07 07:44:48.594047',
    location: 'KOR',
  },
  {
    id: 25,
    code: '-... . ..-. --- .-. . - .... . -.. .- -.-- .. -.. .. . --..-- .. .----. -- -- .- - --- ..- -.-. .... - .... . ... -.- -.-- -.-.--',
    createdAt: '2024-09-08 07:47:02.858883',
    location: 'KOR',
  },
  {
    id: 26,
    code: '.. .-- --- -. -.. . .-. .. ..-. -.-- --- ..- -.- -. --- .-- .-- .... .- - .. - -- . .- -. ... --..-- .----. ..-. .. -. -.. -.-- --- ..- .-. -.. .-. . .- -- ... -.-. --- -- . - .-. ..- . .----. .-.-.-',
    createdAt: '2024-09-09 07:49:19.652689',
    location: 'KOR',
  },
  {
    id: 27,
    code: '..-..- -...-. ..-... .....- -...-. .....- ..-... ------ ...-.. -..--- ...-.. -.---. .....- -.--.. .....- ..-..- -...-. ..-... .....- -...-. .....- ..-... -.---. .....- ...... -..-.. ...--- ..-... -.--.. ....-- ...-.. -..--. ....-- -.--.. .....- -.--.. .....- ....-. --...- ..-... --...- ..-... -.---. .-.--. ....-. -...-. .-.-.- ..---. -...-. ..-... -.---. .....- ..-... -.---. ...... -.---. ..-... --...- ...--. -...-. ....-- ...--- -.---- ..-... .-.... -...-. ....-- ...--- -.-... ..-... -.---. .-.--. .....- -.--.. .....- ..-... -.---. ...-.. ..-... ------ ...--- -..-.. ..-... ..-... --...- ...... -.---. ....-. -.---- .....- ..-..- -.---- ...-.. -.---. ..-... -.---. ....-. -...-. .-.-.-',
    createdAt: '2024-09-11 08:13:25.433981',
    location: 'KOR',
  },
];