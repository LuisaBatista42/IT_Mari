// ok

import { input, number, select } from "@inquirer/prompts";
import { teamManager } from "../team/team-mananger";
import { menuManager } from "./start.menu";
import { gameManager } from "../game/game-manager";
import Round from "../round/round";
import { roundManager } from "../round/round-manager";
import Team from "../team/team";
import Match from "../match/match";
import { matchManager } from "../match/match-manager";

class GameMenu {
  public startRound(matchIndex: number, round: Round) {}

  public async startGame(teams: Team[]) {
    let competitors = teams.slice();
    let round: Round | undefined;
    let winners = 0;

    round = roundManager.advanceRound(competitors);
    while (winners != 1) {
      teamManager.chaosSalt(competitors); // mostrar na tela

      const selectedMatch = await this.matchSelector(round.matches);
      matchManager.startMatch(round.matches[selectedMatch]);

      while (!round.matches[selectedMatch].played) {
        this.platMatch(round.matches[selectedMatch]);
      }
        matchManager.finishMatch(round.matches[selectedMatch]);
      // if (round.winners) {
      //   // round.winners.forEach(winner => console.log(winner.name, winner.score.totalScore))
      //   winners = round.winners?.length;
      //   competitors = roundManager.getNewCompetitors(round);
      // }
    }

    if (round) {
      round.winners.forEach((winner) =>
        console.log(`VENCEDOR DO CAMPEONATO
      ${winner.name}  ${winner.score.totalScore}
    `)
      );
    }

  }

//   Disponibilizar controles para:
// a. Registrar um “blot” para o time A
// b. Registrar um “blot” para o time B
// c. Registrar um “plif” para o time A
// d. Registrar um “plif” para o time B
// e. Encerrar a partida.

  public async platMatch(match: Match) {
    // print match info
    const playMenu = await select({
      message: `Começa partida`,
      choices: [
        {
          name: `Registrar blot para o time ${match.homeTeam}`,
          value: "home-blot"
        }
      ]
    })

  }

  // show
  public async matchSelector(matches: Match[]): Promise<number> {
    const choices = this.buildMatchSelector(matches);

    const answer = await select({
      message: `
        << Round definido >>
         Qual partida jogar`,
      choices,
    });

    return answer;
  }

  // show
  private buildMatchSelector(matches: Match[]) {
    return matches.map((match, index) => {
      if (match.played) {
        return {
          name: `${index} ${match.homeTeam.name} ${match.homeTeam.score.matchScore} | ${match.awayTeam.name} ${match.homeTeam.score.matchScore}`,
          value: index,
          disabled: "Partida encerrada",
        };
      }
      return {
        name: `${index} ${match.homeTeam.name} vs ${match.awayTeam.name}`,
        value: index,
      };
    });
  }
}

export const gameMenu = new GameMenu();
