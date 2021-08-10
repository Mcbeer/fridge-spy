import { Response } from "express";

interface RespondReturnValues<T> {
  success: (responseData: T) => void;
  error: (responseError: Error, code?: number) => void;
}

export const respond = <T>(res: Response): RespondReturnValues<T> => {
  const success = (responseData: T) => {
    res.status(200).json(responseData);
  };

  const error = (responseError: Error, code?: number) => {
    const formattedMessage =
      responseError.message || JSON.stringify(responseError);
    res.status(code || 500).send(formattedMessage);
  };

  return {
    success,
    error,
  };
};
