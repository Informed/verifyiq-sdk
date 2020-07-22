import VerifyIQ from './sdk';
import { AuthTypes } from './types/auth-types.enum';
import { EventsEnum } from './types/events.enum';
import { IPCSerializable, IpcMessage } from './types/ipc.interface';

export default VerifyIQ;
export {
  AuthTypes,
  EventsEnum,
  IPCSerializable,
  IpcMessage
};

module.exports = VerifyIQ;
module.exports.auth = AuthTypes;
module.exports.events = EventsEnum;