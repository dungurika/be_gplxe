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
  ParseBoolPipe,
} from '@nestjs/common';
import { QuestionsService } from '../QuestionService/questions.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { GetQuestionDto } from '../dto/get-question.dto';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiExcludeEndpoint()
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
  @ApiTags('Questions')
  @ApiOperation({ summary: 'Get all questions' })
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

  @Get('/:license_id/topWrongQuestion')
  @ApiTags('Questions')
  @ApiOperation({ summary: 'Get all top questions wrong' })
  @ApiQuery({
    name: 'topWrongQuestion',
    required: false,
    type: Boolean,
    enum: ['true', 'false'],
    description: 'Get top wrong questions or all questions [default: true]',
  })
  async getTopWrongQuestion(
    @Res() res,
    @Query('topWrongQuestion', ParseBoolPipe) topWrongQuestion: boolean = true,
  ) {
    const allQuestions = await this.questionsService.getQuestionByQuery(
      topWrongQuestion ?? true,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Successfully to get top questions',
      data: allQuestions,
    });
  }

  @Get('/:license_id/type')
  @ApiTags('Questions')
  @ApiOperation({ summary: 'Get all type questions' })
  @ApiParam({
    name: 'license_id',
    required: true,
    type: String,
    description: 'pass the license_id (can be obtained from /licese)',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
    description: 'vailid value: Require Question',
  })
  async getQuestionByType(@Res() res, @Query('type') type: string) {
    const allQuestions = await this.questionsService.getQuestionByQuery(
      null,
      type,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Successfully to get type',
      data: allQuestions,
    });
  }

  @Put()
  @ApiExcludeEndpoint()
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
  @ApiExcludeEndpoint()
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
