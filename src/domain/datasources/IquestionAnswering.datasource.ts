import {QuestionAnsweringEntity} from "../entities/question-answering.entity";

export abstract class IquestionAnsweringDatasource {
    abstract analyse(data: any):Promise<QuestionAnsweringEntity>;
}