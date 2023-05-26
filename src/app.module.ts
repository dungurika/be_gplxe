import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LicenseModule } from './license/license.module';
import { TrafficSignsModule } from './traffic-signs/traffic-signs.module';
import { QuestionsModule } from './questions/questions.module';
import { ExamsModule } from './exams/exams.module';
import { UsersModule } from './users/users.module';
import { AllExceptionFilter } from "./http";
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    LicenseModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    TrafficSignsModule,
    QuestionsModule,
    ExamsModule,
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionFilter,
    },],
})
export class AppModule {}
