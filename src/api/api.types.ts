export enum ResultCode {
   Success,
   Error,
}
// authAPI
export type AuthMeType = {
   resultCode: ResultCode;
   messages: string[];
   data: {
      id: number;
      email: string;
      login: string;
   };
};
export type LoginType = {
   resultCode: ResultCode;
   messages: string[];
   data: {
      userId: number;
   };
};
