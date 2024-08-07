// ok

import { input } from "@inquirer/prompts";
import { teamManager } from "../team/team-mananger";
import { menuManager } from "./start.menu";
import { gameManager } from "../game/game-manager";
import Round from "../round/round";
import { roundManager } from "../round/round-manager";
import Team from "../team/team";

class GameMenu {
public async startGame(teams: Team[]) {
  let competitors = teams.slice();
  let round: Round | undefined;
  let winners = 0;

  while (winners != 1) {
    teamManager.chaosSalt(competitors);
    round = roundManager.advanceRound(competitors);

    // if (winners != 1){
    //   console.log(`
    //     Round definido:
    //   `);
    // }
    // roundOverview(round);

    // while (round.matches.length > 0) {
    // const selectedMatch = matchSelector(round.matches);
    gameManager.playRound(round);
    if (round.winners) {
      // round.winners.forEach(winner => console.log(winner.name, winner.score.totalScore))
      winners = round.winners?.length;
      competitors = roundManager.getNewCompetitors(round);
    }
    // }
  }

  if (round) {
    round.winners.forEach((winner) =>
      console.log(`VENCEDOR DO CAMPEONATO
      ${winner.name}  ${winner.score.totalScore}
    `)
    );
  }

  // selector.forEach(selec => console.log(selec));
  // selectMatch()

  // await playRound();
}
}

export const gameMenu = new GameMenu();
