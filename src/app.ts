import { MAX_TEAMS, MIN_TEAMS } from "./constants";
import Match from "./match/match";
import { matchMaking } from "./match/match-making";
import Team from "./team/team";
import { teamManager } from './team/team-mananger';
import getRandomInRange from "./utils";

let winners: Team[] = [];

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
// favoritismo ? -> -1 até 1 onde -1 é away team mais chance de acerto
// TODO tratar caso de 3 times
// 

function solveDuos(duos: Match[], teams: Team[]) {
    duos.forEach(match => {
        // console.log(teams[match.homeTeamIndex].name, "vs", teams[match.awayTeamIndex].name)
        playTime(teams[match.homeTeamIndex], teams[match.awayTeamIndex])
    });
}

function playTime(home: Team, away: Team) {
    let winner: Team;
    winner = home;
    winners.push(winner);
}

export default function app() {
    teamManager.registerTeam("A", "AAAAA", new Date());
    teamManager.registerTeam("B", "BEEEE", new Date());
    teamManager.registerTeam("L", "LUUUU", new Date());
    teamManager.registerTeam("L", "LAAAA", new Date());
    teamManager.registerTeam("R", "ROOOO", new Date());
    teamManager.registerTeam("L", "LIIII", new Date());

    startGame(teamManager.getTeams());
    solveDuos(matchMaking.getDuos(), teamManager.getTeams());

    // console.log(winners)
    winners.forEach((winner) => console.log(winner.name));
    
}
