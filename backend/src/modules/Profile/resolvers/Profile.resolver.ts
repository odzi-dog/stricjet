import { Resolver } from '@nestjs/graphql';
import { ProfileObject } from 'src/types';

@Resolver(of => ProfileObject)
export class ProfileResolver {

};
