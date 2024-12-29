import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export enum Status {
    ACTIVE = 'active',
    DRAFT = 'draft'
}

@Schema({
    timestamps: true,
})

export class Album extends Document {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'School'})
    school_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Branch'})
    branch_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Class'})
    class_id: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({type: [String]})
    images: string[];

    @Prop()
    status: Status;
}
export const AlbumSchema = SchemaFactory.createForClass(Album);