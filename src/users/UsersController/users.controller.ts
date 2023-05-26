import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  Res,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from '../UsersService/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiExcludeEndpoint()
  async createNewUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'Create User Successfully',
      user,
    });
  }

  // @Post('/login')
  // @HttpCode(HttpStatus.OK)
  // async login(
  //   @Body() loginUser: { username: string; password: string },
  //   @Res({ passthrough: true }) reponse: Response,
  // ) {
  //   const loginRes = await this.usersService.login(
  //     loginUser.username,
  //     loginUser.password,
  //   );
  //   if (loginRes.success) {
  //     reponse.cookie('auth_token', loginRes.result?.token, {
  //       httpOnly: true,
  //     });
  //   }
  //   delete loginRes.result?.token;
  //   return loginRes;
  // }

  // @Get('/list')
  // @ApiOperation({ summary: 'Get all users' })
  // async getAllUsers(@Res() res) {
  //   const allUsers = await this.usersService.getUsers();
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Success to get users',
  //     data: allUsers,
  //   });
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
  //
  // @Put(':id')
  // @ApiExcludeEndpoint()
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // @ApiExcludeEndpoint()
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
