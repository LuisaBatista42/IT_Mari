import { select } from "@inquirer/prompts";
import Round from "../round/round";
import Match from "../match/match";

class GameView {

    public async playMatchMenu(match: Match) {
    // print match info
    return await select({
      message: `Começa partida
      ${match.homeTeam.name} ${match.homeTeam.score.matchScore} VS ${match.awayTeam.name} ${match.awayTeam.score.matchScore}  
      `,
      choices: [
        {
          name: `Registrar blot para o time ${match.homeTeam.name}`,
          value: "home-blot",
        },
        {
          name: `Registrar blot para o time ${match.awayTeam.name}`,
          value: "away-blot",
        },
        {
          name: `Registrar plif a favor do time ${match.awayTeam.name}`,
          value: "home-plif",
        },
        {
          name: `Registrar plif a favor do time ${match.homeTeam.name}`,
          value: "away-plif",
        },
        {
          name: `Encerrar partida`,
          value: "leave",
        },
      ],
    });
  }
}

export const gameView = new GameView();

//   public async roundOverview(round: Round) {
//   // TODO printa round
//   round.matches.forEach((match) => playMatch(match));
// printWinner

// printAdvrungh
