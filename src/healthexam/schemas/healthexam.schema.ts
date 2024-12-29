import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({
    timestamps: true,
})

export class HealthExam extends Document {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'School'})
    school_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Branch'})
    branch_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Class'})
    class_id: string;

    @Prop()
    date: Date;

    @Prop()
    note: string;
}

export const HealthExamSchema = SchemaFactory.createForClass(HealthExam);