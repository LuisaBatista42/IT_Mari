import Team from "../team/team";
import Match from "../match/match";

export default interface Round {
  numberOfTeams: number;

  competitors: Team[];
  roundSkipers: Team[];

  matches: Match[];
  winners?: Team[];
  losers?: Team[];
}