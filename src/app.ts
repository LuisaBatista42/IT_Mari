import {
  MAX_TEAMS,
  MIN_TEAMS,
  NOT_ENOUGH_TEAMS_ERROR,
  NOT_PAIR_ERROR,
} from "./constants";

import Team from "./team/team";
import Match from "./match/match";
import Round from "./round/round";
import { teamManager } from "./team/team-mananger";
import { matchManager } from "./match/match-manager";
import { roundManager } from "./round/round-manager";
import { input, number, select, Separator } from "@inquirer/prompts";
import { gameManager } from "./game/game-manager";
import { menuManager } from "./menu/start.menu";

let winners: Team[] = [];



// caso o campeao por pontos e o campeao do campeonato seja diferente, existe um desempate
// home team tem vantagens, possibilidade de rejogar com os mesmos times e ter resultados diferentes
// home team tem vantagem no grito da torcida

export default async function app() {
  teamManager.registerTeam("LI", "LIIII", "2024");
  teamManager.registerTeam("BE", "BEEEE", "2024");
  teamManager.registerTeam("LU", "LUUUU", "2024");
  teamManager.registerTeam("LA", "LAAAA", "2024");
  teamManager.registerTeam("RO", "ROOOO", "2024");
  teamManager.registerTeam("MA", "MAAAA", "2024");

  validateGameStart(teamManager.getTeams());

  await menuManager.initMenu();
}

// dentro do jogo, só sai quando ouver campeao
async function startGame(teams: Team[]) {
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
function playRound() {}
function matchSelector(matches: Match[]) {
  // seletor de match
  throw new Error("Function not implemented.");
}

function playMatch(selectedMatch: Match) {
  // seletor de ponto ou falta
  throw new Error("Function not implemented.");
}

////////////////////////////////////////////////////////////////
async function initMenu() {
  let option;
  const registerOption = [
    {
      name: "Inscrever time",
      value: "register-team",
    },
  ];

  option = registerOption;

  if (teamManager.getTeams().length > MAX_TEAMS) {
    const fullHouse = [
      new Separator("-- Casa cheia! --"),
      {
        name: "Inscrever time",
        value: "full-house",
        disabled: "não está disponivel",
      },
    ];
    option = fullHouse;
  }

  const menu = await select({
    message: `Bem vindo ao Blipfbloft!
    simulador de ballit
    Escolha uma opção:`,
    choices: [
      {
        name: "Começar jogo",
        value: "start-game",
      },
      ...option,
      {
        name: "Encerrar Blipfbloft",
        value: "leave",
      },
    ],
  });

  switch (menu) {
    case "register-team":
      await registerTeam();
      break;

    case "start-game":
      if (validateGameStart(teamManager.getTeams())) {
        await startGame(teamManager.getTeams());
      }
      break;
    case "leave":
      return "leave";
    default:
      break;
  }

  await initMenu();
}

function validateGameStart(teams: Team[]): boolean {
  if (teams.length % 2 != 0) {
    console.error(NOT_PAIR_ERROR);
    return false;
  }
  if (teams.length < MIN_TEAMS) {
    console.error(NOT_ENOUGH_TEAMS_ERROR);
    return false;
  }

  return true;
}

async function registerTeam() {
  const answers = {
    temName: await input({
      message: "Nome do time:",
      required: true,
    }),
    warCry: await input({
      message: "Grito de guerra:",
    }),
    foundationYear: await input({
      message: "Ano de fundação:",
    }),
  };

  teamManager.registerTeam(
    answers.temName,
    answers.warCry,
    answers.foundationYear
  );

  await initMenu();
}

// game manager?

function nextStep(teams: Team[]) {
  let round: Round | undefined;
  let winners = 0;
  let competitors = teams.slice();

  while (winners != 1) {
    round = roundManager.advanceRound(competitors);
    round = gameManager.playRound(round);
    if (round.winners) {
      winners = round.winners?.length;
      competitors = roundManager.getNewCompetitors(round);
    } else {
      throw new Error("No winner found");
    }
  }

  console.log("final scores");
  teams.map((competitor) =>
    console.log(competitor.name, competitor.warCry, competitor.score.totalScore)
  );
}