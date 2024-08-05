import { INITIAL_SCORE, MAX_TEAMS } from "../constants";
import Team from "./team";

class TeamManager {
  private teams: Team[] = [];

  public registerTeam(
    name: string,
    warCry: string,
    foundationYear: Date
  ): void {
    if (this.teams.length > MAX_TEAMS) {
      throw new Error("FULL HOUSE");
    }

    this.teams.push({
      name,
      warCry,
      foundationYear,
      score: {
        matchScore: INITIAL_SCORE,
        matchBlots: 0,
        matchPlifs: 0,
        matchAdvrungh: 0,
        totalScore: 0,
        totalAdvrungh: 0,
        totalBlots: 0,
        totalPlifs: 0
      },
    });
  }

  public sortTeamsByScore(teams: Team[]): Team[] {
    teams.sort(
      (teamA, teamB) => teamB.score.totalScore - teamA.score.totalScore
    );
    return teams;
  }

  public getTeams(): Team[] {
    return this.teams;
  }

  public clearTeams(): void {
    this.teams = [];
  }

  public registerBlot(team: Team) {
    team.score.matchBlots += 1;
    team.score.matchScore += 5;
  }

  public registerPlif(plifed: Team, plifer: Team) {
    plifed.score.matchScore += 1;
    plifer.score.matchPlifs += 1;
  }
}

export let teamManager = new TeamManager();
