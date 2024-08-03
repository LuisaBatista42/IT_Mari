import Match from "../match/match";
import { matchManager } from "../match/match-manager";
import Team from "../team/team";
import { generateNumberArray, nextPowerOfTwo, isPowerOfTwo } from "../utils";
import Round from "./round";

class RoundResolver {
  public generateRound(teams: Team[]):Round {
    console.log(teams.length)
    let numberOfTeams = teams.length;
    let roundSkipers = 0;
    if (!isPowerOfTwo(numberOfTeams)){
      roundSkipers = nextPowerOfTwo(numberOfTeams) - numberOfTeams;
      console.log("round skupers", roundSkipers);
    } 
    
    const teamsForRound = numberOfTeams - roundSkipers;

    let teamKeys = generateNumberArray(teamsForRound); //[ 1, 2 ]
    console.log("teamskeys", teamKeys)

    return this.create(
      numberOfTeams,
      teams,
      roundSkipers,
      matchManager.createMatchs(teamKeys)
    );
  }

  public create(
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

  public playRound(round: Round): Round {
    round.matches.forEach((match) => {
      console.log(
        round.competitors[match.homeTeamIndex].name,
        "vs",
        round.competitors[match.awayTeamIndex].name
      );

      round.winners?.push(
        matchManager.playMatch(
          round.competitors[match.homeTeamIndex],
          round.competitors[match.awayTeamIndex]
        )
      );
    });

    return round;
  }

  public getNewCompetitors(round: Round){
    return [...round.winners, ...round.roundSkipers];
  }
}


export let roundResolver = new RoundResolver();
