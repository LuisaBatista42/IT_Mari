import Round from "../round/round";
import ScoreMatch from "../score/score-match";
import Team from "../team/team";
import { teamManager } from "../team/team-mananger";
import { getRandomInRange, nextPowerOfTwo } from "../utils";
import Match from "./match";

class MatchManager {
  checkIfAllMatchesPlayed(matches: Match[]) {
    return matches.every((match) => match.played === true);
  }

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
      console.log(homeTeamIndex, awayTeamIndex);
    }
    
    return duos;
  }

  // self explanatory really
  public startMatch(match: Match) {
    [match.homeTeam, match.awayTeam].forEach((team) => {
      this.resetMatchPoints(team);
    });
  }

  // mark a match as finished, by reseting the scores and passing it to the final score atribute
  public finishMatch(match: Match, round: Round) {
    [match.awayTeam, match.homeTeam].forEach((team) => {
      this.passScore(team);
    });

    match.winner = match.homeTeam;
    if (match.awayTeam.score.matchScore > match.homeTeam.score.matchScore) {
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
  public resetMatchPoints(team: Team) {
    team.score.matchBlots = 0;
    team.score.matchPlifs = 0;
    team.score.matchScore = 50;
  }
  public getMatchScore(match: Match): ScoreMatch {
    return {
      homeMatchScore: match.homeTeam.score.matchScore,
      awayMatchScore: match.awayTeam.score.matchScore,
    };
  }

  // plays what the player choose
  public playMatch(option: string, match: Match, round: Round) {
    switch (option) {
      case "home-blot":
        teamManager.registerBlot(match.homeTeam);
        break;
      case "away-blot":
        teamManager.registerBlot(match.awayTeam);
        break;
      case "home-plif":
        teamManager.registerPlif(match.awayTeam, match.homeTeam);
        break;
      case "away-plif":
        teamManager.registerPlif(match.homeTeam, match.awayTeam);
        break;
      default:
        break;
    }

    // TODO: substitute these lines with some other thing
  }
}

export const matchManager = new MatchManager();
