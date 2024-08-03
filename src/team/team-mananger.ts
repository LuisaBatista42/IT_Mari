import { MAX_TEAMS } from "../constants";
import Team from "./team";

class TeamManager {
  private teams: Team[] = [];

  public registerTeam(name: string, warCry: string, foundationYear: Date) {
    if (this.teams.length < MAX_TEAMS) {
      this.teams.push({ name, warCry, foundationYear });
    }
  }

  public getTeams(): Team[] {
    return this.teams;
  }

  public clearTeams(): void{
    this.teams = [];
  }
}

export let teamManager = new TeamManager();