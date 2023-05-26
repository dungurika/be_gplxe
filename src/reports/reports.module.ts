import { Module } from '@nestjs/common';
import { ReportsController } from './ReportsController/reports.controller';
import { ReportsService } from './ReportsService/reports.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
