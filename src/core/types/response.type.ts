export type ResponseType = {
  error?: boolean;
  code: number;
  message: string;
  metadata: any;
  stack?: string;
};