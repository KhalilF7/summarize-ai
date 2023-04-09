import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // create NestJS application instance
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  // listen to incoming requests on port 8000
  await app.listen(8000, () => {
    console.log('Application is listening on port 8000');
  });
}

bootstrap().catch(error => {
  console.error(error);
  process.exit(1);
});
