import Match from "./match";

class MatchMaking {
    private duos: Match[] = [];

    public createMatchs(array: number[]): Match[] {
      const arrayLength = array.length;
    
      for (let index = 0; index < arrayLength / 2; index++) {
        // nao vai chega aqui errado (arrumar depois)
        const homeTeam: number = array
          .splice(this.getRandomInRange(array.length), 1)
          .at(0)!;
        const awayTeam: number = array
          .splice(this.getRandomInRange(array.length), 1)
          .at(0)!;
    
        this.duos.push({homeTeamIndex: homeTeam, awayTeamIndex: awayTeam});
      }
      return this.duos;
    }
    
    public getRandomInRange(range: number) {
      return Math.floor(Math.random() * range);
    }

    public getDuos(): Match[]{
        return this.duos;
    }
}

export let matchMaking = new MatchMaking();