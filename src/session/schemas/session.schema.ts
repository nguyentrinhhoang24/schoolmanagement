import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, mongo } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';


export enum Status {
  ACTIVE = 'active',
  DRAFT = 'draft'
}

@Schema({
  timestamps: true,
})

export class Session extends Document {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'School'})
  school_id: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Branch'})
  branch_id: string;

  @Prop()
  code: string;

  @Prop()
  title: string;

  @Prop()
  startdate: Date;

  @Prop()
  enddate: Date;
 
  @Prop()
  status: Status;
}

export const SessionSchema = SchemaFactory.createForClass(Session);