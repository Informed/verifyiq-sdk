export interface IPCSerializable {
  serialize(): string;
}

export class IpcMessage implements IPCSerializable {
  static fromEvent(event: MessageEvent) {
    try {
      const message = <IpcMessage>JSON.parse(event.data);
      return new IpcMessage(message.message, message.payload);
    } catch (e) {
      return null;
    }
  }
  constructor(
    public message: string,
    public payload?: any
  ) {}

  serialize(): string {
    return JSON.stringify({
      type: this.message,
      payload: this.payload
    });
  }
}