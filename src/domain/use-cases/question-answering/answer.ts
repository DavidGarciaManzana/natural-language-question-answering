import {QuestionAnsweringEntity} from "../../entities/question-answering.entity";
import {IquestionAnsweringRepository} from "../../repositories/Iquestion-answering.repository";
require('@tensorflow/tfjs');
import * as qna from '@tensorflow-models/qna';


export interface AnswerUseCase{
    execute(data:any):Promise<QuestionAnsweringEntity>
}

export class Answer implements AnswerUseCase{
    constructor(
        private readonly repository:IquestionAnsweringRepository
    ) {
    }

    async execute(message: string[]): Promise<QuestionAnsweringEntity> {
        try {
        const passage = "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet."
        const question = "Who is the CEO of Google?"
        // const passage = "The world of construction is complex, and its multiple variables to control represent significant challenges. For this reason, managing a construction project can be a titanic task without timely supervision and information to make decisions aimed at achieving success.\n" +
        //     "\n" +
        //     "Despite the existence of hundreds of technological solutions in the market, such as ERPs, that seek to increase efficiency and productivity, in Mexico, there is only one truly comprehensive and robust solution specialized in the construction industry. It has proven for over 34 years to be an expert in best practices to contribute to changing the operational culture of the business and drive its growth.\n" +
        //     "\n" +
        //     "In this interview with Otilia Villarreal, Commercial Director of Enkontrol, she explains the company's evolution and how, through its clients, it has become a leader in comprehensive systems for construction.\n" +
        //     "\n" +
        //     "How did Enkontrol originate? What need was it trying to solve?\n" +
        //     "We started 34 years ago as a unit price package for the then CNIC (now CMIC). As we got to know the industry, we realized that these types of companies commonly lacked a culture oriented towards preventive operational control and a comprehensive system that could achieve this while providing consistent information for decision-making.\n" +
        //     "\n" +
        //     "With that vision in mind, we began developing our ERP based on that initial unit price package. Currently, EnKontrol is a Mexican company that has been dedicated to solving operational issues and the need for timely and accurate information in the construction industry for over 30 years.\n" +
        //     "\n" +
        //     "What does Enkontrol bring to the companies that adopt it?\n" +
        //     "We are convinced that our solution is of great relevance to the companies that adopt it, as one of our clients once told me: \"My company is divided between before Enkontrol and after Enkontrol.\"\n" +
        //     "\n" +
        //     "Enkontrol helps companies implement the best operational practices in the industry, supported by an ERP that ensures their maintenance and operational control. In construction, it is common for companies to grow disorderly without controlling relevant project variables such as margin, executed work, warehouses, flows, etc. They lack consistent information and experience constant financial leaks. Enkontrol helps solve these issues, supporting their growth and improving profitability by optimizing resources.\n" +
        //     "\n" +
        //     "We achieve a radical change in approximately four months, ensuring that they have control not only over their projects but over the entire company. For this, we have the most specialized personnel in construction and the most extensive software in the industry.\n" +
        //     "\n" +
        //     "How has the company evolved?\n" +
        //     "We have gone from being a local company in Monterrey with 30 employees in the 90s to becoming an international company with sales in different Latin American countries, serving over 350 clients, with offices in Monterrey, Mexico City, Durango, and Bogotá.\n" +
        //     "\n" +
        //     "Currently, Enkontrol has 230 employees who work every day to ensure that we exceed the expectations our clients had when they acquired our solution. To achieve this, we have developed services that support our clients not only in having an ERP that controls their processes but also in making their processes more efficient, with the best practices, contributing to the evolution of their company. In addition to this, our software has evolved over time, from its beginnings using the pioneering COBOL language in the 80s to the present, where we have a platform that integrates cloud services, business intelligence, and multiple databases, providing information to our clients on any device anywhere they are.\n" +
        //     "\n" +
        //     "Today, we have different management modules, from Business Intelligence to constant margin planning and monitoring modules for projects. These modules are linked to real-time operations and allow, in addition to consistent and timely information, monitoring the most relevant variables for effective decision-making.\n" +
        //     "\n" +
        //     "Our Customer Relationship Management (CRM) tool has adapted to leverage each of the new communication channels to nurture and precisely follow up on potential clients, integrating digital marketing and the latest technology available for this purpose. On the other hand, fiscal aspects are crucial, and we have had to evolve significantly in this area. Today, our administration module is the most comprehensive in the industry, including integral compliance with SAT's tax reform provisions. We integrate all operational and control processes with the issuance of CFDI, ensuring that the information is supported by the company's records. Also, we have a web portal for suppliers to register their invoices and payment complement CFDIs with all the required validations for their automatic association with generated policies.\n" +
        //     "\n" +
        //     "What are your differentiators?\n" +
        //     "At Enkontrol, we not only provide training in using the tool but also support our clients in changing their operational culture to make their processes more efficient and contribute to the growth and evolution of the company.\n" +
        //     "\n" +
        //     "Implementing an ERP is not just about acquiring the license and training users. To make a significant contribution to clients, it is necessary to analyze how the company operates and identify areas for improvement to propose the best industry practices that adapt to that specific company and have a positive impact on its operations. Our solution, in addition to training, includes continuous support to successfully transition from the current system to the new one throughout an operational cycle. Otherwise, the acquisition of the solution remains a good attempt or a failed investment.\n" +
        //     "\n" +
        //     "Enkontrol can achieve all this thanks to the following:\n" +
        //     "\n" +
        //     "The software, besides having the broadest scope in the industry, complies with all controls, language, and best practices required in our country. This can only be achieved after implementing it for hundreds of clients.\n" +
        //     "Knowledge, experience, and specialization of our people in the construction industry in Mexico, as demonstrated by several facts:\n" +
        //     "Over 33 years exclusively in the construction industry.\n" +
        //     "Over 350 clients of all sizes and types: residential, infrastructure, industrial, small, medium, large, and very large.\n" +
        //     "18 of the country's 20 largest residential construction companies use Enkontrol as their information system.\n" +
        //     "Over 300,000 houses annually, the largest developments of horizontal, vertical, and mixed-use housing, as well as large infrastructure and industrial projects such as Terminal 2 of Mexico City Airport and the new Mexico City Airport, highways, hospitals, schools, the adaptation of the Hermanos Rodríguez racetrack for Formula 1, etc., were planned, built, managed, and marketed with Enkontrol.\n" +
        //     "Proven methodology that allows system implementation and a change in operational culture in a very short time, approximately four months for a medium-sized company.\n" +
        //     "More than 350 satisfied clients in the construction industry. Our first client is still an Enkontrol client.\n" +
        //     "No other ERP in Mexico comes close to these data within the construction industry, nor collaborates as closely with its clients in their growth and improvement of competitiveness.\n" +
        //     "In your experience, what are the operational challenges that most affect construction industry companies?\n" +
        //     "Like any industry, construction companies need to be more competitive, and to do so, it is necessary to control the most relevant variables affecting profitability.\n" +
        //     "\n" +
        //     "At Enkontrol, we have been concerned about helping our clients improve profitability through five points:\n" +
        //     "\n" +
        //     "Margin control and projection.\n" +
        //     "Preventive control of operations.\n" +
        //     "Reliable and timely information for decision-making.\n" +
        //     "Agile dashboards with relevant information for the executive level.\n" +
        //     "Software that integrates all operational areas of the company.\n" +
        //     "What future plans does Enkontrol have?\n" +
        //     "Within our vision, we aim to continue being the leader in solutions for the construction industry and remain focused on the inclusion of new technologies and user experience as a driver to support the growth of our current 350 clients.\n" +
        //     "\n" +
        //     "Today, it is essential to evolve at the changing pace of social networks, having increasing connectivity through more devices.\n" +
        //     "\n" +
        //     "We work to ensure that the users' experience with our system is completely satisfactory, positively impacting the company's productivity"
        // const question = "With how many employees did Enkontrol start?"
        const model = await qna.load();

        // Finding the answers
        const answers = await model.findAnswers(question, passage);

        console.log('Answers: ');
        console.log(answers);

            return this.repository.analyse(answers);
        } catch (error) {
            console.error('Error analyzing sentiment:', error);
            return this.repository.analyse([0]);
        }
    }

}