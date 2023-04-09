// Import required dependencies
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

// Define AuthModule to handle authentication related functionality
@Module({
  // Import required modules
  imports: [
    // Register PassportModule with default jwt strategy
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Register JwtModule with dynamic configuration
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          // Use JWT_SECRET and JWT_EXPIRE values from .env file
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRE'),
          },
        }
      }
    }),

    // Register UserSchema with MongooseModule
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],

  // Declare controllers and services
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],

  // Export JwtStrategy and PassportModule for use in other modules
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
