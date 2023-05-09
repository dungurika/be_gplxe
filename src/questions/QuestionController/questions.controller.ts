import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  Put,
  Query,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { QuestionsService } from '../QuestionService/questions.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { GetQuestionDto } from '../dto/get-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async createQuestion(
    @Res() res,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    const postQuestion = await this.questionsService.createQuestion(
      createQuestionDto,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Create Question Successfully',
      postQuestion,
    });
  }

  @Get()
  async getAllQuestions(
    @Res() res,
    @Query(ValidationPipe) query: GetQuestionDto,
  ) {
    const allQuestions = await this.questionsService.getQuestions(query);
    return res.status(HttpStatus.OK).json({
      message: 'Success to get question',
      data: allQuestions,
    });
  }

  @Get('/:license_id')
  async getTopWrongQuestion(
    @Res() res,
    @Query('topWrongQuestion') topWrongQuestion: boolean,
    @Query('type') type: string,
  ) {
    const allQuestions = await this.questionsService.getQuestionByQuery(
      topWrongQuestion,
      type,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Successfully',
      data: allQuestions,
    });
  }

  @Put()
  async updateQuestion(
    @Res() res,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Query('questionId') questionId,
  ) {
    const putQuestion = await this.questionsService.updateQuestion(
      questionId,
      updateQuestionDto,
    );
    if (!putQuestion) throw new NotFoundException('Question not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Question Updated Successfully',
      putQuestion,
    });
  }

  @Delete()
  async deleteQuestionById(@Res() res, @Query('questionId') questionId) {
    const questionDelete = await this.questionsService.deleteQuestion(
      questionId,
    );
    if (!questionDelete) throw new NotFoundException('Question not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Question Deleted Successfully',
      questionDelete,
    });
  }
}
