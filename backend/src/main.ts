import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from 'src/modules/Application/module';

import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  // Initializing express-session
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }));

  await app.listen(process.env.NODE_ENV == 'production' ? 3000 : 3001);
}
bootstrap();
