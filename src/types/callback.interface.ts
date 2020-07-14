import { IVerificationActionObj } from '~/types/verification-action.interface';

export type EventCallback = (payload?: any) => void;

export type VerificationActionCallback = (
  verificationAction: IVerificationActionObj,
  reason: string
) => void;
