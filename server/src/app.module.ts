import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SummarizeAiModule } from './summarize-ai/summarize-ai.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Load environment variables from a file
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // Connect to a MongoDB database using Mongoose
    MongooseModule.forRoot(process.env.DB_URI),
    // Load the Summarize AI module
    SummarizeAiModule,
    // Load the Auth module
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
