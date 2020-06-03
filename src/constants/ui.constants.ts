// Used for security purposes to generate random ID
// and attach it to the frame
export const INJECTED_UI_ID = `${Math.round(Math.random() * 100)}${Date.now() + Math.round(Math.random() * 100)}-verify-iq`;
