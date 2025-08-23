import { customAPIError } from './customAPIError';

interface customAPIErrorNextResponseResponse {
  message: string;
  statusCode: number;
}
export const customAPIErrorNextResponse = (err: unknown): customAPIErrorNextResponseResponse => {
  let message = 'An unexpected error occurred!';
  let statusCode = 500;

  if (err instanceof customAPIError) {
    message = err.message;
    statusCode = err.statusCode;
  }

  return {
    message,
    statusCode,
  };
};
