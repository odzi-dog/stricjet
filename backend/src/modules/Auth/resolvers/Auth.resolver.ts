import { Query, Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { AuthService } from 'src/modules/Auth/services';
import { Profile, ProfileObject } from 'src/types';
import { IProfile, IRequest } from '@app/shared';
import { UseGuards } from '@nestjs/common';
import { UserAuthGuard } from 'src/guards';

@Resolver(of => ProfileObject)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  // query me
  @Query(returns => ProfileObject)
  @UseGuards(UserAuthGuard)
  async me(@Context('user') user: IProfile): Promise<Profile> {
    return user;
  };

  // mutation login
  @Mutation(returns => ProfileObject)
  async login(
    @Args('token') token: string,
    @Context('req') req: IRequest
  ) {
    // Authorizing user with provided token
    const profile = await this.authService.authorize(token);
    
    // Saving this profile's uuid into
    // our session object.
    req.session.token = token;
    req.session.lastAuthorizedUser = profile;
    return profile;
  };
};
