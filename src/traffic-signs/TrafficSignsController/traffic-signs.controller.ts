import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  NotFoundException, Put
} from "@nestjs/common";
import { TrafficSignsService } from '../TrafficSignsService/traffic-signs.service';
import { CreateTrafficSignDto } from '../dto/create-traffic-sign.dto';
import { UpdateTrafficSignDto } from '../dto/update-traffic-sign.dto';

@Controller('traffic-signs')
export class TrafficSignsController {
  constructor(private readonly trafficSignsService: TrafficSignsService) {}

  @Post()
  async createTrafficSigns(@Res() res ,@Body() createTrafficSignDto: CreateTrafficSignDto) {
    const postTrafficSigns = await this.trafficSignsService.createTrafficSigns(createTrafficSignDto)
    return res.status(HttpStatus.OK).json({
      message:'Create TrafficSigns Successfully',
      postTrafficSigns
    })
  }

  @Get()
  async getAllTrafficSigns(@Res() res){
    const allTrafficSigns = await this.trafficSignsService.getTrafficSigns()
    return res.status(HttpStatus.OK).json({
      message:'Success',
      data:allTrafficSigns
    })
  }

  @Get('/:trafficSignsId')
  async getTrafficSignsById(@Res() res ,@Param('trafficSignsId') trafficSignsId){
    const trafficSigns = await this.trafficSignsService.getTrafficSignsById(trafficSignsId)
    if(!trafficSigns) throw new NotFoundException('TrafficSigns not found');
    return res.status(HttpStatus.OK).json({
      message:'Success',
      data:trafficSigns
    })
  }

  @Put()
  async updateTrafficSigns(@Res() res, @Body() updateTrafficSignsDto:UpdateTrafficSignDto ,@Query('trafficSignsId') trafficSignsId)
  {
    const putTrafficSigns = await this.trafficSignsService.updateTrafficSigns(trafficSignsId,updateTrafficSignsDto)
    if(!putTrafficSigns) throw new NotFoundException('TrafficSigns not exists');
    return res.status(HttpStatus.OK).json({
      message:'TrafficSigns Updated Successfully',
      putTrafficSigns
    })
  }

  @Delete()
  async deleteLicenseById(@Res() res ,@Query('trafficSignsId') trafficSignsId){
    const trafficSignsDelete = await this.trafficSignsService.deleteTrafficSigns(trafficSignsId)
    if(!trafficSignsDelete) throw new NotFoundException('TrafficSigns not exists');
    return res.status(HttpStatus.OK).json({
      message:'TrafficSigns Deleted Successfully',
      trafficSignsDelete
    })
  }
}
