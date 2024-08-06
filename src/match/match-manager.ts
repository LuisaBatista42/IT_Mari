import Round from "../round/round";
import ScoreMatch from "../score/score-match";
import Team from "../team/team";
import { getRandomInRange, nextPowerOfTwo } from "../utils";
import Match from "./match";

class MatchManager {
  // creates a match with a random duo of teams
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
        played: false,
      });
    }
    return duos;
  }

  // mark a match as finished, by reseting the scores and passing it to the final score atribute
  public finishMatch(match: Match) {
    [match.awayTeam, match.homeTeam].forEach((team) => {
      this.passScore(team);
      this.resetMatchPoints(team);
    });
    
    match.winner = match.homeTeam;
    if (match.awayTeam.score.matchScore > match.homeTeam.score.matchScore){
      match.winner = match.awayTeam;
    }

    match.played = true;
  }

  // pass score and stats to total score and stats
  private passScore(team: Team) {
    team.score.totalBlots += team.score.matchBlots;
    team.score.totalPlifs += team.score.matchPlifs;
    team.score.totalScore += team.score.matchScore;
  }

  // self explanatory really
  private resetMatchPoints(team: Team) {
    team.score.matchBlots = 0;
    team.score.matchPlifs = 0;
    team.score.matchScore = 50;
  }
  public getMatchScore(match: Match){
    const scoreMatch: ScoreMatch = {
      homeMatchScore: match.homeTeam.score.matchScore,
      awayMatchScore: match.homeTeam.score.matchScore
    };
  }

  // self explanatory really x2
  public startMatch(match: Match) {
    [match.homeTeam, match.awayTeam].forEach((team) => {
      this.resetMatchPoints(team);
    });
  }


  // mostlyhelper function for testing TODO: decide if its still needed
  public playMatch(home: Team, away: Team, round: Round) {
    home.score.totalScore += 50;

    // TODO: substitute these lines with some other thing
    const winner = home;

    round.winners.push(winner);
    return home;
  }
}

export let matchManager = new MatchManager();
