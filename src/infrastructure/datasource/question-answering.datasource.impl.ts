import {IquestionAnsweringDatasource} from "../../domain/datasources/IquestionAnswering.datasource";
import {QuestionAnsweringEntity} from "../../domain/entities/question-answering.entity";

export class QuestionAnsweringDatasourceImpl implements IquestionAnsweringDatasource {
    async analyse(data: number[]): Promise<QuestionAnsweringEntity> {
    return QuestionAnsweringEntity.fromObject(data)
    }
}