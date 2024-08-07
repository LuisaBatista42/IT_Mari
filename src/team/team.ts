import Score from "../score/score";

export default interface Team {
    name: string;
    warCry: string;
    foundationYear: string;
    score: Score;

    //biggestScore?: number;
}