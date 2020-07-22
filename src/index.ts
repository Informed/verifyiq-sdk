import VerifyIQ from './sdk';
import { AuthTypes } from './types/auth-types.enum';
import { EventsEnum } from './types/events.enum';

export default VerifyIQ;
export {
  AuthTypes,
  EventsEnum
};

module.exports = VerifyIQ;
module.exports.auth = AuthTypes;
module.exports.events = EventsEnum;