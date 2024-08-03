import { MAX_TEAMS, MIN_TEAMS } from "./constants";
import Match from "./match/match";
import { matchMaking } from "./match/match-making";
import Team from "./team/team";
import { teamManager } from './team/team-mananger';

function startGame(teams: Team[]) {
    if (teams.length > MIN_TEAMS && teams.length % 2 == 0) {
        console.log("comoçõou")
        // teams.map((team) => console.log(team.warCry));

        pairMatchup(teams);
    }
}

function pairMatchup(teams: Team[]) {
  let pairUp = Array.from({ length: teams.length }, (_, index) => index); //[ 0, 1, 2, 3 ]
  matchMaking.createMatchs(pairUp);
}


// home team tem vantagens, possibilidade de rejogar com os mesmos times e ter resultados diferentes
// home team tem vantagem no grito da torcida
// favoritismo ? -> -1 até 1 onde -1 é away team mais chance


function solveDuos(duos: Match[], teams: Team[]){
    duos.forEach(match => {
        teams[match.homeTeamIndex]
    });
}




export default function app() {
    teamManager.registerTeam("A", "AAAAA", new Date());
    teamManager.registerTeam("B", "BEEEE", new Date());
    teamManager.registerTeam("L", "LUUUU", new Date());
    teamManager.registerTeam("L", "LAAAA", new Date());

    startGame(teamManager.getTeams());
    console.log(matchMaking.getDuos())

    
}
