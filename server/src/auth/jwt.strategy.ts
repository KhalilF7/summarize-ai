import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {
        // Call the constructor of PassportStrategy and pass in the JWT configuration
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    /**
     * Validate the user based on the JWT payload
     * @param payload - The decoded JWT payload containing the user ID
     * @returns The user object if it exists in the database
     * @throws UnauthorizedException if the user does not exist in the database
     */
    async validate(payload: { id: string }): Promise<User> {
        const { id } = payload;
        const user = await this.userModel.findById(id);

        if(!user) {
            throw new UnauthorizedException('Login first to access this endpoint')
        }

        return user;
    }
}
