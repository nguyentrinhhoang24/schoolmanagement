import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, mongo } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Branch } from 'src/branch/schemas/branch.schema';


export enum Status {
  ACTIVE = 'active',
  DRAFT = 'draft'
}

@Schema({
  timestamps: true,
})

export class School extends Document {
  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Branch'}]})
  branch_id: string[];

  @Prop()
  name: string; 

  @Prop()
  address: string;
  
  @Prop()
  phone: string;
  
  @Prop()
  email: string;
  
  @Prop()
  description: string;
  
  @Prop()
  status: Status;
  
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // user: User;

}

export const SchoolSchema = SchemaFactory.createForClass(School);