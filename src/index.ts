import VerifyIQ from './sdk';
import { AuthTypes } from './types/auth-types.enum';
import { EventsEnum } from './types/events.enum';
import { IpcMessage } from './types/ipc.interface';

// ES6 module exported for type defs
export default VerifyIQ;
export {
  AuthTypes,
  EventsEnum,
  IpcMessage
};

module.exports = VerifyIQ;

module.exports.IpcMessage = IpcMessage;
module.exports.AuthTypes = AuthTypes;
module.exports.EventsEnum = EventsEnum;

// @deprecated
module.exports.auth = AuthTypes;
module.exports.events = EventsEnum;