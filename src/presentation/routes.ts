import {Router} from "express";
import {CountryController} from "./countries/controller";
import {CountryRoutes} from "./countries/routes";
import {SentimentAnalysisRoutes} from "./sentiment-analysis/routes";
import {QuestionAnsweringRoutes} from "./question-answering/routes";

export class AppRoutes{
    static get routes():Router{
        const router = Router();

        router.use('/api/countries',CountryRoutes.routes )
        router.use('/api/enkontrol/ai/sentiment-analysis',SentimentAnalysisRoutes.routes )
        router.use('/api/enkontrol/ai/question-answering',QuestionAnsweringRoutes.routes )
        return router
    }
}