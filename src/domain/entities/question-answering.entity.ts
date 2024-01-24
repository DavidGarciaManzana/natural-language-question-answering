export class QuestionAnsweringEntity {
    constructor(
        public scoreArray: number[]
    ) {}

    static fromObject(array: number[] ): QuestionAnsweringEntity {
        if (array === undefined) {
            throw new Error("Score is required");
        }
        return  new QuestionAnsweringEntity(array);
    }
}