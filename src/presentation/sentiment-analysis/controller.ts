import {Request,Response} from "express";
import {IsentimentAnalysisRepository} from "../../domain/repositories/Isentiment-analysis.repository";
import {AnalyseWithNatural} from "../../domain/use-cases/sentiment-analysis/analyse-with-natural";
import {AnalyseWithSentiment} from "../../domain/use-cases/sentiment-analysis/analyse-with-sentiment";
import {AnalyseWithNlp} from "../../domain/use-cases/sentiment-analysis/analyse-with-nlp";

export class SentimentAnalysisController{

    // Dep. Iny.
    constructor(
        private readonly sentimentAnalysisRepository:IsentimentAnalysisRepository
    ) {
    }
    analyse = (req:Request, res:Response,library:number) => {
        const {message} = req.body;
        if(!message) {return res.status(400).json({error: `Message property is required`})}
        if(message.length === 0) {return res.status(418).json({error: `Message or messages inside message property are required`})}
        if(library===1){
            new AnalyseWithNatural(this.sentimentAnalysisRepository)
                .execute(message)
                .then(sentimentAnalysis => res.json(sentimentAnalysis))
                .catch(error=> res.status(400).json({error}))
        } else if (library===2){
            new AnalyseWithNlp(this.sentimentAnalysisRepository)
                .execute(message)
                .then(sentimentAnalysis => res.json(sentimentAnalysis))
                .catch(error=> res.status(400).json({error}))
        }else if (library===3){
            new AnalyseWithSentiment(this.sentimentAnalysisRepository)
                .execute(message)
                .then(sentimentAnalysis => res.json(sentimentAnalysis))
                .catch(error=> res.status(400).json({error}))
        }


    }

}