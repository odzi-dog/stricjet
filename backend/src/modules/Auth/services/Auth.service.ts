import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { request, gql } from 'graphql-request';
import { IProfile } from '@app/shared';
import { ProfileService } from 'src/modules/Profile/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  // public authorize
  // - Fetch token information from
  // cloud.odzi.dog api, find account
  // with provided user email (create if
  // not found) and return it.
  public async authorize(token?: string): Promise<IProfile | null> {
    // Making request to external api
    const query = gql`
      query FetchToken($token: String!) {
        fetchToken(secret: $token) {
          profile {
            email
          }
        }
      }
    `;

    if (!token) throw new HttpException('Invalid or missing profile token', HttpStatus.UNAUTHORIZED);

    const response = await request('https://api.cloud.odzi.dog/graphql', query, { token });
    const email = response?.fetchToken?.profile?.email

    // Let's now check if we have this user
    // in our database
    let profile = await this.profileService.fetchByEmail(email);
    if (profile == null) {
      // Creating new profile
      profile = await this.profileService.create(email);
    };

    return profile ?? null;
  };
};