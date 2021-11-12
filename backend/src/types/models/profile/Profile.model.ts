import { IProfile } from '@app/shared';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Document & Profile;

@Schema()
export class Profile implements IProfile {
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, unique: false })
  username?: string;
};

export const ProfileSchema = SchemaFactory.createForClass(Profile);