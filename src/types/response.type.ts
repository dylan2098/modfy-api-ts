export type DataErrorType = {
  error?: boolean;
  code: number;
  message: string;
  metadata: any;
  stack?: string;
};