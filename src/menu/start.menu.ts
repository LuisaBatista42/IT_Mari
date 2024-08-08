import { input, number, select, Separator } from "@inquirer/prompts";
import Team from "../team/team";
import { MAX_TEAMS, MIN_TEAMS, NOT_ENOUGH_TEAMS_ERROR, NOT_PAIR_ERROR } from "../constants";
import { teamManager } from "../team/team-mananger";
import { gameMenu } from "./game.menu";

class MenuManager {
  registerOption = [
    {
      name: "Inscrever time",
      value: "register-team",
    },
  ];

  fullHouse = [
    new Separator("-- Casa cheia! --"),
    {
      name: "Inscrever time",
      value: "full-house",
      disabled: "não está disponivel",
    },
  ];
  // validate = async (input: any) => {
  //   const currentYear = new Date().getFullYear();
  //   const minYear = 1936;
  //   if (input === undefined) {
  //     return false;
  //   }
  //   if (typeof input !== "number" || isNaN(input)) {
  //     return "Input deve ser um numero.";
  //   }

  //   if (input < minYear || input > currentYear) {
  //     return `O ano deve ser entre ${minYear} e ${currentYear}.`;
  //   }

  //   // If all checks pass, return true
  //   return true;
  // };

  public async initMenu() {
    let option;

    option = this.registerOption;

    if (teamManager.getTeams().length > MAX_TEAMS) {
      const option = this.fullHouse;
    }

    const menu = await select({
      message: `Bem vindo ao Blipfbloft!
        simulador de Ballit
        Escolha uma opção:`,
      choices: [
        {
          name: "Começar jogo",
          value: "start-game",
        },
        {
          name: "Encerrar Blipfbloft",
          value: "leave",
        },
        ...option,
      ],
    });
    
    switch (menu) {
      case "register-team":
        await this.registerTeam();
        break;

      case "start-game":
        if (this.validateGameStart(teamManager.getTeams())) {
          await gameMenu.startGame(teamManager.getTeams());
        }
        break;
      case "leave":
        return "leave";
      default:
        break;
    }

    await this.initMenu();
  }

  private validateGameStart(teams: Team[]): boolean {
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

  private async registerTeam() {
    const answers = {
      temName: await input({
        message: "Nome do time:",
        required: true,
      }),
      warCry: await input({
        message: "Grito de guerra:",
      }),
      foundationYear: await input({
        message: "Ano de fundação: (entre 1936 e o ano atual)",
      }),
    };

    if (answers.foundationYear ) {
      teamManager.registerTeam(
        answers.temName,
        answers.warCry,
        answers.foundationYear
      );
    }

    await menuManager.initMenu();
  }
}

export const menuManager = new MenuManager();
