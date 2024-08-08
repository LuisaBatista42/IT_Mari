// ok

import { select } from "@inquirer/prompts";
import { teamManager } from "../team/team-mananger";
import Round from "../round/round";
import { roundManager } from "../round/round-manager";
import Team from "../team/team";
import Match from "../match/match";
import { matchManager } from "../match/match-manager";
import { gameView } from "../game/game-view";
import ScoreMatch from "../score/score-match";

class GameMenu {
  public startRound(matchIndex: number, round: Round) {}

  public async startGame(teams: Team[]) {

    let competitors = teams.slice();
    let round: Round | undefined;
    let winners = 0;

    while (winners != 1) {
      round = roundManager.advanceRound(competitors);

      while (true) {
        let selectedMatch = await this.matchSelector(round.matches);
        if (selectedMatch == -1) {
          console.warn("Rodada encerrada");
          break;
        }

        matchManager.startMatch(round.matches[selectedMatch]); // reseta pontos

        while (true) {
          const matchMenuOption = await gameView.playMatchMenu(
            round.matches[selectedMatch]
          );

          if (matchMenuOption == "leave") {
            matchManager.finishMatch(round.matches[selectedMatch], round);
            break;
          }

          matchManager.playMatch(
            matchMenuOption,
            round.matches[selectedMatch],
            round
          );
        }
      }

      if (round.winners) {
        // round.winners.forEach((winner) =>
        //   console.log(winner.name, winner.score.totalScore)
        // );
        winners = round.winners?.length;
        competitors = roundManager.getNewCompetitors(round);
        competitors.forEach(cimp => console.warn(cimp.name))
        teamManager.chaosSalt(competitors); // mostrar na tela
      }
    }

 
    console.warn("acabouu")
  }

  // show
  public async matchSelector(matches: Match[]): Promise<number> {
    if (matchManager.checkIfAllMatchesPlayed(matches)) {
      return -1;
    }
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
        const matchScore: ScoreMatch = matchManager.getMatchScore(match);
        return {
          // usar match winner pra mudar cor de quem ganhou
          name: ` ${match.homeTeam.name} ${matchScore.homeMatchScore} | ${match.awayTeam.name} ${matchScore.awayMatchScore}`,
          value: index,
          disabled: "Partida encerrada",
        };
      }
      return {
        name: ` ${match.homeTeam.name} vs ${match.awayTeam.name}`,
        value: index,
      };
    });
  }
}

export const gameMenu = new GameMenu();
