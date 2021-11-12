import { Request } from 'express';
import { Session } from 'express-session';
import { ISessionContext } from '.';

// Exporting IRequest interface
export interface IRequest extends Request {
  session: ISessionContext & Session,
};