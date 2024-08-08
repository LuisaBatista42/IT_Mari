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
  public async roundOverview(round: Round) {
    console.warn("Competidores do round:");
    round.competitors.forEach((competitor, index) =>
      console.info(index, competitor.name)
    );
    console.warn("----------------\t ----------------");

    console.warn("Partidas do round:");
    round.matches.forEach((match, index) =>
      console.info(index, match.homeTeam.name, "vs", match.awayTeam.name)
    );
    console.warn("----------------\t ----------------");

    if (round.roundSkipers.length) {
      console.warn("Jogadores que pulam a rodada:");
      round.roundSkipers.forEach((roundSkiper, index) =>
        console.info(index, roundSkiper.name)
      );
      console.warn("----------------\t ----------------");
    }
  }
}

export const gameView = new GameView();

// TODO printWinnerTable

// TODO printAdvrungh
