import Match from "../match/match";
import Round from "../round/round";
import Team from "../team/team";
import { getRandomInRange } from "../utils";

class GameManager {
  public playRound(round: Round): Round {
    round.matches.forEach((match) => {
      //   console.log(
      //     round.competitors[match.homeTeamIndex].name,
      //     "vs",
      //     round.competitors[match.awayTeamIndex].name
      //   
      round.winners?.push(
        this.playMatch(
          match.homeTeam,
          match.awayTeam
        )
      );
    });
    return round;
  }


  public playMatch(home: Team, away: Team, round?: Round) {
    home.score.totalScore += 50;
    const winner = home
    if (round) {
      round.winners.push(winner);
    }
    return home;
  }
}

export const gameManager = new GameManager();

