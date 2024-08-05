import Match from "../match/match";
import { matchManager } from "../match/match-manager";
import Team from "../team/team";
import { generateNumberArray, nextPowerOfTwo, isPowerOfTwo } from "../utils";
import Round from "./round";

class RoundManager {

  public generateRound(teams: Team[]):Round {
    console.log(teams.length)
    let numberOfTeams = teams.length;
    let roundSkipers = 0;
    
    if (!isPowerOfTwo(numberOfTeams)){
      roundSkipers = nextPowerOfTwo(numberOfTeams) - numberOfTeams;
    } 
    
    const teamsForRound = numberOfTeams - roundSkipers;
    let teamKeys = generateNumberArray(teamsForRound); //[ 1, 2 ]


    return this.createRound(
      numberOfTeams,
      teams,
      roundSkipers,
      matchManager.createMatchs(teamKeys, teams)
    );
  }

  public createRound(
    numberOfTeams: number,
    teams: Team[],
    roundSkipers: number,
    matches: Match[]
  ): Round {
    return {
      numberOfTeams,
      competitors: teams,
      roundSkipers: teams.splice(0, roundSkipers),
      matches: matches,
      winners: [],
      losers: [],
    } as Round;
  }

  public getNewCompetitors(round: Round){
    return [...round.winners, ...round.roundSkipers];
  }
}

export let roundResolver = new RoundManager();
