import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from 'src/types';

export const GlobalModels = MongooseModule.forFeature([
  {
    name: 'Profile',
    schema: ProfileSchema,
  },
]);
