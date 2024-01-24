import {IquestionAnsweringRepository} from "../../domain/repositories/Iquestion-answering.repository";
import {QuestionAnsweringEntity} from "../../domain/entities/question-answering.entity";

export class QuestionAnsweringRepositoryImpl implements IquestionAnsweringRepository{
    constructor(
        private readonly datasource:IquestionAnsweringRepository
    ) {
    }
    async analyse(data: any): Promise<QuestionAnsweringEntity> {
        return this.datasource.analyse(data)
    }
}