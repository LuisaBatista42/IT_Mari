import Round from "../round/round";
import Team from "../team/team";
import { getRandomInRange, nextPowerOfTwo } from "../utils";
import Match from "./match";

class MatchManager {
  public createMatchs(
    competitorsIndex: number[],
    competitors: Team[]
  ): Match[] {
    const numberOfMatches = competitorsIndex.length;
    let duos: Match[] = [];
    for (let index = 0; index < numberOfMatches / 2; index++) {
      // nao vai chega aqui errado (arrumar depois o !)
      const homeTeamIndex: number = competitorsIndex
        .splice(getRandomInRange(competitorsIndex.length), 1)
        .at(0)!;

      const awayTeamIndex: number = competitorsIndex
        .splice(getRandomInRange(competitorsIndex.length), 1)
        .at(0)!;

      duos.push({
        homeTeam: competitors[homeTeamIndex],
        awayTeam: competitors[awayTeamIndex],
        played: false
      });
    }

    return duos;
  }



  public playMatch(home: Team, away: Team, round: Round) {
    home.score.totalScore += 50;
    const winner = home;

    round.winners.push(winner);
    return home;
  }

  public finishMatch(match: Match){
    [match.awayTeam, match.homeTeam].forEach((team) => {
        team.score.totalAdvrungh += team.score.matchAdvrungh
        team.score.totalBlots += team.score.matchBlots
        team.score.totalPlifs += team.score.matchPlifs;
        team.score.totalScore += team.score.matchScore;
        console.log(team.score)
      });
      match.winner = match.homeTeam;
      if (match.awayTeam.score.matchScore > match.homeTeam.score.matchScore) match.winner = match.awayTeam;
      match.played = true;
  }
}

export let matchManager = new MatchManager();
