import '@babel/polyfill';
import 'url-search-params-polyfill';
import 'whatwg-fetch';

import VerifyIQ from './sdk';
import { AuthTypes } from './types/auth-types.enum';
import { EventsEnum } from './types/events.enum';
import { IpcMessage } from './types/ipc.interface';
import { VerificationActionPayload } from './types/verification-action.interface';

// ES6 module exported for type defs
export default VerifyIQ;
export {
  AuthTypes,
  EventsEnum,
  IpcMessage,
  VerificationActionPayload
};

module.exports = VerifyIQ;

module.exports.IpcMessage = IpcMessage;
module.exports.AuthTypes = AuthTypes;
module.exports.EventsEnum = EventsEnum;

// @deprecated
module.exports.auth = AuthTypes;
module.exports.events = EventsEnum;