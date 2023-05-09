import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../schemas/questions.schema';
import { GetQuestionDto } from '../dto/get-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel('Question') private readonly questionsModel: Model<Question>,
  ) {}

  async getQuestions(query: GetQuestionDto): Promise<Question[]> {
    const { exam_id, license_id } = query;
    if (!exam_id || !license_id) {
      return this.questionsModel.find();
    }
    return this.questionsModel.find({
      $and: [{ license_id: license_id }, { exam_id: exam_id }],
    });
  }

  async getQuestionByQuery(
    topWrongQuestion: boolean,
    type: string,
  ): Promise<Question[]> {
    let questions = await this.questionsModel.find();

    if (topWrongQuestion) {
      questions = questions.filter(
        (question) => question.topWrongQuestion === true,
      );
    } else if (type) {
      questions = questions.filter(
        (question) => question.type === 'Require Question',
      );
    }

    return questions;
  }

  async getQuestionById(questionId: string): Promise<Question> {
    return this.questionsModel.findById(questionId);
  }

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const question = await this.questionsModel.create(createQuestionDto);
    return question.save();
  }

  async updateQuestion(
    questionId: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionsModel.findByIdAndUpdate(
      questionId,
      updateQuestionDto,
      { new: true },
    );
  }

  async deleteQuestion(questionId: string): Promise<Question> {
    return this.questionsModel.findByIdAndDelete(questionId);
  }
}
