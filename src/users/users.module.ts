import { Module } from '@nestjs/common';
import { UsersService } from './UsersService/users.service';
import { UsersController } from './UsersController/users.controller';
import { UsersSchema } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UsersSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
