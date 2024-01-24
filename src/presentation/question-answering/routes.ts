import {Router} from "express";
import {QuestionAnsweringController} from "./controller";
import {QuestionAnsweringDatasourceImpl} from "../../infrastructure/datasource/question-answering.datasource.impl";
import {QuestionAnsweringRepositoryImpl} from "../../infrastructure/repositories/question-answering.repository.impl";



export class QuestionAnsweringRoutes{
    static get routes():Router{
        const router = Router();
        //If you want to change the datasource you only have to change it here
        const datasource = new QuestionAnsweringDatasourceImpl()
        const questionAnsweringRepository = new QuestionAnsweringRepositoryImpl(datasource)
        const questionAnsweringController = new QuestionAnsweringController(questionAnsweringRepository)
        router.post('/',(req,res) =>questionAnsweringController.analyse(req,res) )

        return router
    }
}