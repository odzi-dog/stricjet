import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Profile, ProfileDocument } from 'src/types';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile')
    private Profile: Model<ProfileDocument>,
  ) {}

  // public fetchByEmail
  // - Fetch user by their email 
  public async fetchByEmail(email: string): Promise<Profile> {
    return await this.Profile.findOne({ email });    
  };

  // public create
  // - Create new profile with
  // passed email and username
  public async create(email: string, username?: string): Promise<Profile> {
    return await (new this.Profile({ email, username })).save();
  };
};
