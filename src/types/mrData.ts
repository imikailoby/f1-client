export type MRData<T = unknown> = T & {
  limit: string;
  offset: string;
  series: string;
  total: string;
  url: string;
  xmlns: string;
};
