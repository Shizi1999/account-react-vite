import axios, { AxiosError } from 'axios';
import HttpStatusCode from '~/constant/httpStatusCode.enum';
import { ErrorResponse } from '~/types/utils.type';
import backendErrorCode from '~/constant/backendErrorCode';

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{}>>(error) &&
    error.response?.data?.errorCode === backendErrorCode.TOKEN_EXPIRED
  );
}
