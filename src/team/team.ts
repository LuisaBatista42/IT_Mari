import Score from "../score/score";

export default interface Team {
    name: string;
    warCry: string;
    foundationYear: Date;
    score: Score;

    //biggestScore?: number;
}