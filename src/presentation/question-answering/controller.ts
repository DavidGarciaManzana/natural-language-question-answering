import {Request,Response} from "express";

import {IquestionAnsweringRepository} from "../../domain/repositories/Iquestion-answering.repository";
import {Answer} from "../../domain/use-cases/question-answering/answer";

export class QuestionAnsweringController{

    // Dep. Iny.
    constructor(
        private readonly questionAnsweringRepository:IquestionAnsweringRepository
    ) {
    }
    analyse = (req:Request, res:Response) => {
        const {message} = req.body;
        if(!message) {return res.status(400).json({error: `Message property is required`})}
        if(message.length === 0) {return res.status(418).json({error: `Message or messages inside message property are required`})}
        new Answer(this.questionAnsweringRepository)
            .execute(message)
            .then(sentimentAnalysis => res.json(sentimentAnalysis))
            .catch(error=> res.status(400).json({error}))


    }

}