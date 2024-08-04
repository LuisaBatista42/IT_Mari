import Team from "../team/team";
import { getRandomInRange, nextPowerOfTwo } from "../utils";
import Match from "./match";

class MatchManager {

  public createMatchs(competitors: number[]): Match[] {
    const numberOfMatches = competitors.length;
    let duos: Match[] = [];
    for (let index = 0; index < numberOfMatches / 2; index++) {
      // nao vai chega aqui errado (arrumar depois o !)
      const homeTeam: number = competitors
        .splice(getRandomInRange(competitors.length), 1)
        .at(0)!;
      const awayTeam: number = competitors
        .splice(getRandomInRange(competitors.length), 1)
        .at(0)!;

      duos.push({ homeTeamIndex: homeTeam, awayTeamIndex: awayTeam });
    }

    return duos;
  }

  // public getDuos(): Match[] {
  //   return this.duos;
  // }


}

export let matchManager = new MatchManager();
