import { IVerificationDispatcher } from './verification-dispatcher.interface';

export interface IVerificationActionObj {
  applicationId: string;
  applicant: string;
  verificationType: string;
  user: IVerificationDispatcher;
}

export type VerificationActionPayload = {
  verificationActionObj: IVerificationActionObj;
  reason: string;
};
