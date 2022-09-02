const BASE = "https://tei-source.com/api/v1";
export const STOREAGE = "https://tei-source.com/storage/app";
//api for authentication
const BASE_AUTH = `${BASE}/auth`;
export const LOGIN_API_SIGNIN: string = `${BASE_AUTH}/login`;
export const LOGIN_API_SIGNUP: string = `${BASE_AUTH}/register`;
//api for chat
const BASE_CHAT = `${BASE}/chat`;
export const CHAT_API_GET_LIST: string = `${BASE_CHAT}/list`;
export const CHAT_API_GET_MESSAGES: string = `${BASE_CHAT}/messages`;
export const CHAT_API_SEND_MESSAGE: string = `${BASE_CHAT}/send`;