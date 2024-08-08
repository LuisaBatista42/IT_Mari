import Match from "../match/match";
import Round from "../round/round";
import Team from "../team/team";
import { getRandomInRange } from "../utils";

class GamTest {

  public playMatch(){

  }

  // //test
  // public startMatch(matchIndex: number, round: Round): Round {
  //   const match = round.matches[matchIndex]
    

  //   round.matches.splice(matchIndex, 1);
  //   round.winners?.push(this.playMatchTest(match.homeTeam, match.awayTeam));

  //   return round;
  // }

  //test func
//   public playRound(round: Round): Round {
//     round.matches.forEach((match) => {
//       //   console.log(
//       //     round.competitors[match.homeTeamIndex].name,
//       //     "vs",
//       //     round.competitors[match.awayTeamIndex].name
//       //
//       round.winners?.push(this.playMatchTest(match.homeTeam, match.awayTeam));
//     });
//     return round;
// //   }

//   //test
//   public playMatchTest(home: Team, away: Team, round?: Round) {
//     home.score.totalScore += 50;
//     const winner = home;
//     if (round) {
//       round.winners.push(winner);
//     }
//     return home;
//   }
}

export const gameTest = new GamTest();

