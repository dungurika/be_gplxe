import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<Users>) {}

  async createUser(creatUserDto: CreateUserDto): Promise<Users> {
    // const user = await this.userModel.create(creatUserDto);

    const user = await this.userModel.findOne({
      email: creatUserDto.email,
    });

    if (user) {
      throw new Error('User already exist');
    }

    return user.save();
  }

  // async login

  async getUsers(): Promise<Users[]> {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
