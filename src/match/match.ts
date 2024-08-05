import Team from "../team/team";

export default interface Match {
  homeTeam: Team;
  awayTeam: Team;
  winner?: Team;
  played: boolean;
}
