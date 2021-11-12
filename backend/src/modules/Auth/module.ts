import { Module } from '@nestjs/common';

// Importing Global Services and Global Models
import { GlobalModels, GlobalServices } from 'src/bootstrap';
import * as Resolvers from 'src/modules/Auth/resolvers';

@Module({
  imports: [GlobalModels],
  providers: [...Object.values(GlobalServices), ...Object.values(Resolvers)],
})
export class AuthModule {}