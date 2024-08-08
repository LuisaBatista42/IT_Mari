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
import { roundManager } from "./round/round-manager";
import { gameTest } from "./game/game-test";
import { menuManager } from "./menu/start.menu";


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

  // validateGameStart(teamManager.getTeams());

  await menuManager.initMenu();
}
