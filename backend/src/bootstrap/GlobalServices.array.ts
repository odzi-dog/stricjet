import * as AuthServices from 'src/modules/Auth/services';
import * as ProfileServices from 'src/modules/Profile/services';

export const GlobalServices = [
  ...Object.values(AuthServices),
  ...Object.values(ProfileServices),
];