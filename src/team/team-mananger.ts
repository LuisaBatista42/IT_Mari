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
        totalScore: INITIAL_SCORE,
        totalAdvrungh: 0,
        totalBlots: 0,
        totalPlifs: 0,
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
}

export let teamManager = new TeamManager();
