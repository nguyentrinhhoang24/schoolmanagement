import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { mongo } from "mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true,
})

export class Bus extends Document {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'School'})
    school_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Branch'})
    branch_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Session'})
    session_id: string;

    @Prop()
    code: string;

    @Prop()
    route: string;

    @Prop()
    description: string;

}

export const BusSchema = SchemaFactory.createForClass(Bus);