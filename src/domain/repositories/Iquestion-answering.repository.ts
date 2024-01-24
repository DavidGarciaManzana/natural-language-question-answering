import {QuestionAnsweringEntity} from "../entities/question-answering.entity";


export abstract class IquestionAnsweringRepository {
    abstract analyse(data: any):Promise<QuestionAnsweringEntity>;
}