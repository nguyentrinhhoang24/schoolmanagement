import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({
    timestamps: true,
})

export class FeeItem extends Document {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'School'})
    school_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Branch'})
    branch_id: string;

    @Prop()
    code: string;

    @Prop()
    title: string;

    @Prop({type: Number, required: true})
    price: number;

    @Prop()
    description: string;
}

export const FeeItemSchema = SchemaFactory.createForClass(FeeItem);
