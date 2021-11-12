import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import * as GlobalModules from 'src/bootstrap/GlobalModules.array';

@Module({
  imports: [
    // ConfigModule
    ConfigModule.forRoot(),

    // MongooseModule
    MongooseModule.forRoot(process.env.MONGO_URL),

    // GraphQLModule
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      cors: {
        origin:
          process.env.NODE_ENV === 'production'
            ? 'https://www.stricjet.ml'
            : 'http://localhost:3000',
        credentials: true,
      },
    }),

    // Application modules
    ...Object.values(GlobalModules),
  ]
})
export class ApplicationModule {}
