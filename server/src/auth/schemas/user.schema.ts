import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// Define schema for user object
@Schema({
    timestamps: true
})
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ unique: [ true, 'Duplicate email entered'] })
    email: string;

    @Prop({ required: true })
    password: string;
}

// Use SchemaFactory to create a Mongoose schema for the User class
export const UserSchema = SchemaFactory.createForClass(User);
