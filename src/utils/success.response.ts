import { Response } from 'express';
import StatusCode from "../core/statusCode";
import ReasonStatusCode from "../core/reasonPhrase";

export class SuccessResponse {
    code: number;
    error: boolean;
    message: string;
    metadata: any;

    constructor({ message = '', statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata}) {
      this.error = false;
      this.code = statusCode;
      this.message = !message ? reasonStatusCode : message;
      this.metadata = metadata;
    }

    send(res: Response, headers = {}) {
      return res.status(this.code).json(this);
    }
}

export class CreatedSuccessResponse extends SuccessResponse {
  constructor({ message = '', statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata}) {
    super({ message, statusCode, reasonStatusCode, metadata});
  }
}