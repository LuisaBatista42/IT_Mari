import Match from "../match/match";
import { matchManager } from "../match/match-manager";
import Team from "../team/team";
import { teamManager } from "../team/team-mananger";
import { generateNumberArray, nextPowerOfTwo, isPowerOfTwo, getRandomInRange } from "../utils";
import Round from "./round";

class RoundManager {

  // takes an array of teams and creates a unique round with random matchups, returns the new round
  public advanceRound(teams: Team[]): Round {
    let numberOfTeams = teams.length;
    let roundSkipers = 0;

    if (teams.length > 1) teamManager.chaosSalt(teams);
    
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

  // creates a round with the necessary information and initializes atributes as empty arrays or zeroes
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

  // joins the previous round winners and round skipers teams, returning the array to form a new unique round
  public getNewCompetitors(round: Round): Team[]{
    return [...round.winners, ...round.roundSkipers];
  }

  
}

export let roundManager = new RoundManager();
