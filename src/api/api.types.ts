export enum ResultCode {
   Success,
   Error,
}

type ResponseType<T = {}, RC = ResultCode> = {
   resultCode: RC;
   messages: string[];
   data: T;
};

export type GeneralizedType = ResponseType;
// 
export type AuthMeType = ResponseType<{
   id: number;
   email: string;
   login: string;
}>;
export type LoginType = ResponseType<{ userId: number }>;
