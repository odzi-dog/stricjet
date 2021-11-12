import { IProfile } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Profile')
export class ProfileObject implements IProfile {
  @Field({ nullable: false })
  _id: string;
  
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  username?: string;
};