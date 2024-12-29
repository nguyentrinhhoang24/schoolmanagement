import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


export enum Status {
  ACTIVE = 'active',
  DRAFT = 'draft'
}

@Schema({
  timestamps: true,
})

export class Branch extends Document {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'School'})
  school_id: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'ClassGroup'}]})
  classgroup_id: string[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}]})
  menu_id: string[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}]})
  session_id: string[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}]})
  subject_id: string[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'News'}]})
  news_id: string[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'FeeItem'}]})
  feeitem_id: string[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Invoice'}]})
  invoice_id: string[];

  @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}])
  album_id: string[];

  @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'HealthExam'}])
  healthexam_id: string[];

  @Prop()
  code: string;
  
  @Prop()
  name: string;
  
  @Prop()
  address: string;

  @Prop()
  status: Status;
  

}

export const BranchSchema = SchemaFactory.createForClass(Branch);