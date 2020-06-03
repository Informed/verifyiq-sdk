type LogLevel = 'log' | 'warn';

class Log {
  public timestamp: number;

  constructor(
    public message: string,
    public level: LogLevel
  ) {
    this.timestamp = Date.now();
  }
}

class Logger {
  private _logs: Log[];

  constructor(private enabled: boolean) {
    this._logs = [];
  }

  public setEnabled(isEnabled: boolean) {
    this.enabled = isEnabled;
  }

  public warn(message: any): void {
    this._log(message, 'warn');
  }

  public log(message: any): void {
    this._log(message, 'log');
  }

  private _log(message: any, level: LogLevel): void {
    if (this.enabled) {
      console[level]('[VerifyIQ]', message);
    }
    const serializedMessage = typeof message === 'string'
      ? message
      : JSON.stringify(message);

    const log = new Log(serializedMessage, level);
    this._logs.push(log);
  }
}


export default Logger;