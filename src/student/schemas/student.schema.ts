import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";

export enum Status {
    ACTIVE = 'active',
    DRAFT = 'draft'
}

export enum Gender {
    BOY = 'boy',
    GIRL = 'girl'
}

export enum BloodGroup {
    A_plus = 'A+',
    A_minus = 'A-',
    B_plus = 'B+',
    B_minus = 'B-',
    AB_plus = 'AB+',
    AB_minus = 'AB-',
    O_plus = 'O+',
    O_minus = 'O-',
}

export class healthInfo {
    @Prop()
    height: number;

    @Prop()
    weight: number;

    @Prop({ enum: BloodGroup })
    bloodgroup: BloodGroup;

    @Prop()
    allergy: string;

    @Prop()
    heartrate: number;

    @Prop()
    eyes: string;

    @Prop()
    ears: string;

    @Prop()
    note: string;
}

@Schema({
    timestamps: true,
})


export class Student extends Document {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'School'})
    school_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Branch'})
    branch_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Class'})
    class_id: string;

    @Prop()
    code: string;

    @Prop()
    name: string;

    @Prop()
    birthday: Date;

    @Prop()
    gender: Gender;

    @Prop()
    address: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    parent_id: string[];

    @Prop({type: healthInfo})
    health: healthInfo;

    @Prop()
    status: Status;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
StudentSchema.index({ school_id: 1 });
StudentSchema.index({ branch_id: 1 });
StudentSchema.index({ class_id: 1 });