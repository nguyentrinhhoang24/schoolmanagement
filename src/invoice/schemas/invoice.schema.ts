import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { FeeItem } from "src/feeitem/schemas/feeitem.schema";

export enum PayMethod {
    BANK = 'bank',
    CASH = 'cash'
}

@Schema({
    timestamps: true,
})
export class Invoice extends Document {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'School'})
    school_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Branch'})
    branch_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Class'})
    class_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Student'})
    student_id: string;

    @Prop()
    title: string;

    @Prop()
    payment_deadline: Date;

    @Prop()
    payment_method: PayMethod;

    @Prop()
    description: string;

    @Prop({type: [{
        fee_item: {type: mongoose.Schema.Types.ObjectId, ref: 'FeeItem'},
        quantity: {type: Number},
    }]})
    fee_items: {fee_item: FeeItem | string; quantity: number }[];

    @Prop()
    total: number;

}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);