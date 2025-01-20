export interface IConstants {
  [key: string]: string | number;
}

export const constants: IConstants = {
  API_URL: process.env.NEXT_PUBLIC_API_URL as string,
};
