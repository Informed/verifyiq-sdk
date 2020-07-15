import { IVerificationActionObj } from '~/types/verification-action.interface';

export type EventCallback<T> = (payload?: T) => void;

export type VerificationActionCallback = (
  verificationAction: IVerificationActionObj,
  reason: string
) => void;
