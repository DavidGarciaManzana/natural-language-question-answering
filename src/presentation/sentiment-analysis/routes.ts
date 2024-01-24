import {Router} from "express";
import {SentimentAnalysisDatasourceImpl} from "../../infrastructure/datasource/sentiment-analysis.datasource.impl";
import {SentimentAnalysisRepositoryImpl} from "../../infrastructure/repositories/sentiment-analysis.repository.impl";
import {SentimentAnalysisController} from "./controller";



export class SentimentAnalysisRoutes{
    static get routes():Router{
        const router = Router();
        //If you want to change the datasource you only have to change it here
        const datasource = new SentimentAnalysisDatasourceImpl()
        const sentimentAnalysisRepository = new SentimentAnalysisRepositoryImpl(datasource)
        const sentimentAnalysisController = new SentimentAnalysisController(sentimentAnalysisRepository)
        router.post('/natural',(req,res) =>sentimentAnalysisController.analyse(req,res,1) )
        router.post('/nlp',(req,res) =>sentimentAnalysisController.analyse(req,res,2) )
        router.post('/sentiment',(req,res) =>sentimentAnalysisController.analyse(req,res,3) )

        return router
    }
}