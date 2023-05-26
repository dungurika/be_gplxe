import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum userTypes {
  ADMIN = 'admin',
  User = 'user',
}

@Schema({
  timestamps: true,
  collection: 'users',
})
export class Users {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true, enum: [userTypes.ADMIN, userTypes.User] })
  type: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
