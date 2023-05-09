import { Injectable } from '@nestjs/common';
import { CreateTrafficSignDto } from '../dto/create-traffic-sign.dto';
import { UpdateTrafficSignDto } from '../dto/update-traffic-sign.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TrafficSigns } from "../schemas/traffic_signs.schema";

@Injectable()
export class TrafficSignsService {
  constructor(@InjectModel('TrafficSigns') private readonly trafficSignsModel:Model<TrafficSigns>) {
  }

  async getTrafficSigns() :Promise<TrafficSigns[]>{
    return this.trafficSignsModel.find();
  }

  async getTrafficSignsById(trafficSignsId:string) :Promise<TrafficSigns>{
    return this.trafficSignsModel.findById(trafficSignsId)
  }

  async createTrafficSigns(createTrafficSignDto:CreateTrafficSignDto) :Promise<TrafficSigns>{
    const traffic_signs = await this.trafficSignsModel.create(createTrafficSignDto)
    return traffic_signs.save();
  }

  async updateTrafficSigns(trafficSignsId:string,updateTrafficSignsDto:UpdateTrafficSignDto):Promise<TrafficSigns>{
    return this.trafficSignsModel.findByIdAndUpdate(trafficSignsId,updateTrafficSignsDto,{new:true});
  }

  async deleteTrafficSigns(trafficSignsId:string):Promise<TrafficSigns>{
    return this.trafficSignsModel.findByIdAndDelete(trafficSignsId)
  }
}
