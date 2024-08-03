import { MIN_TEAMS } from "./constants";
import Match from "./match/match";
import { matchManager } from "./match/match-manager";
import Round from "./round/round";
import { roundResolver } from "./round/round-resolver";
import Team from "./team/team";
import { teamManager } from "./team/team-mananger";
import { getRandomInRange, nextPowerOfTwo } from "./utils";

let winners: Team[] = [];

function validateGameStart(teams: Team[]) {
  if (teams.length > MIN_TEAMS && teams.length % 2 == 0) {
    console.log("comoçõou:");
    console.log("pair matchup:");
    return teams;
  } else {
    throw new Error("Problema no inicio  do jogo");
  }
}

function nextStep(teams: Team[]) {
  let round: Round | undefined; 
  let winners = 0;
  let competitors = teams.slice();

  while (winners != 1) {
    round = roundResolver.generateRound(competitors);
    round = roundResolver.playRound(round);
    if (round.winners){
      winners = round.winners?.length;
      competitors = roundResolver.getNewCompetitors(round);
    } else {
      throw new Error("No winner found");
    }
  }

  console.log("final scores")
  teams.map((competitor) =>
    console.log(competitor.name, competitor.warCry, competitor.scores)
  );

}

// home team tem vantagens, possibilidade de rejogar com os mesmos times e ter resultados diferentes
// home team tem vantagem no grito da torcida
// favoritismo ? -> -1 até 1 onde -1 é away team mais chance de acerto


export default function app() {
  teamManager.registerTeam("LI", "LIIII", new Date());
  teamManager.registerTeam("BE", "BEEEE", new Date());
  teamManager.registerTeam("LU", "LUUUU", new Date());
  teamManager.registerTeam("LA", "LAAAA", new Date());
  teamManager.registerTeam("RO", "ROOOO", new Date());
  teamManager.registerTeam("MA", "MAAAA", new Date());

  validateGameStart(teamManager.getTeams());

  nextStep(teamManager.getTeams());

}

// TODO playtime
