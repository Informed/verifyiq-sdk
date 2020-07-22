import { IVerificationActionObj } from './verification-action.interface';

export type RequestIQStipulations = {
  [key: string]: any
};

export type EventCallback<T> = (payload?: T) => void;

export type DocumentRequestCallback = EventCallback<RequestIQStipulations>;

export type VerificationActionCallback = (
  verificationAction: IVerificationActionObj,
  reason: string
) => void;
