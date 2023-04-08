import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Summary {

    @Prop()
    text: string;

    @Prop()
    summary: string;

    @Prop()
    user: string;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);