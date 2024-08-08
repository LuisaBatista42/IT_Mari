import { INITIAL_SCORE, MAX_TEAMS } from "../constants";
import { getRandomInRange } from "../utils";
import Team from "./team";

class TeamManager {
  private teams: Team[] = [];

  // register a team in the teams list
  public registerTeam(
    name: string,
    warCry: string,
    foundationYear: string
  ): void {
    this.teams.push({
      name,
      warCry,
      foundationYear,
      score: {
        matchScore: 0,
        matchBlots: 0,
        matchPlifs: 0,
        totalScore: 0,
        totalBlots: 0,
        totalPlifs: 0,
        totalAdvrungh: 0,
      },
    });
  }

  //sort team by biggest total score and return
  public sortTeamsByScore(teams: Team[]): Team[] {
    teams.sort(
      (teamA, teamB) => teamB.score.totalScore - teamA.score.totalScore
    );
    return teams;
  }

  // returns team list
  public getTeams(): Team[] {
    return this.teams;
  }

  // clears the registered teams and resets any reference to it
  public clearTeams(): void {
    this.teams.length = 0;
  }

  // register a blot to a team
  public registerBlot(team: Team) {
    team.score.matchBlots += 1;
    team.score.matchScore += 5;
  }

  // register a plif to a team and gives the plifed team a point
  public registerPlif(plifed: Team, plifer: Team) {
    plifed.score.matchScore += 1;
    plifer.score.matchPlifs += 1;
  }

  // at any moment, pass a team array to chaosSalt and advrunghs can happen!
  // returns an array with the affected teams
  chaosSalt(teams: Team[]): Team[] {
    let advrunghedTeams: Team[] = [];

    const chaos = Math.floor(Math.random() * 10);
    let advrunghedTeam = getRandomInRange(teams.length);

    if (chaos > 4) {
      this.registerAdvrungh(teams[advrunghedTeam]);
      advrunghedTeams.push(teams[advrunghedTeam]);
    }

    if (chaos === 9) {
      advrunghedTeam = getRandomInRange(teams.length);
      this.registerAdvrungh(teams[advrunghedTeam]);
      advrunghedTeams.push(teams[advrunghedTeam]);
    }
    return advrunghedTeams;
  }

  // register a advrungh for a team
  public registerAdvrungh(team: Team) {
    if (!team) return;
    team.score.totalAdvrungh += 1;
    if (team.score.totalScore > 10) {
      team.score.totalScore -= 10;
      return;
    }
    team.score.totalScore = 0;
  }
}

export const teamManager = new TeamManager();
