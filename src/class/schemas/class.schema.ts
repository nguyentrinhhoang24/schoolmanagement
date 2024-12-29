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

export class Class extends Document {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'School'})
  school_id: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Branch'})
  branch_id: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'ClassGroup'})
  classgroup_id: string;
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Session'})
  session_id: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user_id: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}]})
  student_id: string[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}]})
  album_id: string[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'HealthExam'}]})
  healthexam_id: string[];

  @Prop()
  class_thumbnail: string;

  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  age: number;
  
  @Prop()
  status: Status;
}

export const ClassSchema = SchemaFactory.createForClass(Class);