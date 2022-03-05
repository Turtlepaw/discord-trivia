import { Collection, CommandInteraction } from "discord.js";
import {
  TriviaGameOptions,
  TriviaManagerOptions,
  TriviaManagerOptionsStrict,
} from "../Typings/interfaces";
import { TriviaManagerGames } from "../Typings/types";
import DiscordTriviaError from "./DiscordTriviaError";
import TriviaGame from "./TriviaGame";

export default class TriviaManager {
  public readonly games: TriviaManagerGames = new Collection();
  public readonly options: TriviaManagerOptionsStrict;
  public static readonly defaults: TriviaManagerOptionsStrict = {
    theme: "BLURPLE",
  };

  constructor(options?: TriviaManagerOptions) {
    this.options = options
      ? Object.assign(TriviaManager.defaults, options)
      : TriviaManager.defaults;
  }

  createGame(interaction: CommandInteraction, options?: TriviaGameOptions) {
    if (!interaction.isCommand())
      throw new DiscordTriviaError(
        "Supplied interaction must be a CommandInteraction",
        "INVALID_INTERACTION"
      );

    return new TriviaGame(interaction, this, options);
  }

  public validator = {
    validateDiscordStructures(game: TriviaGame) {
      if (game.guild === null) {
        const { message, header } = DiscordTriviaError.errors.guildNullish;
        throw new DiscordTriviaError(message, header);
      } else if (game.channel === null) {
        const { message, header } = DiscordTriviaError.errors.channelNullish;
        throw new DiscordTriviaError(message, header);
      } else if (!game.channel.isText()) {
        const { message, header } = DiscordTriviaError.errors.channelNonText;
        throw new DiscordTriviaError(message, header);
      }
    },

    validatePlayerCount(
      label: "minPlayerCount" | "maxPlayerCount",
      val: unknown
    ) {
      if (!val && val != 0) {
        throw new DiscordTriviaError(
          `A ${label} option for TriviaGameOptions is required`,
          "MISSING_OPTION"
        );
      } else if (typeof val != "number" && typeof val != "string") {
        throw new DiscordTriviaError(
          `The ${label} option for TriviaGameOptions must be of type number or string`,
          "INVALID_OPTION"
        );
      } else if (isNaN(+val)) {
        throw new DiscordTriviaError(
          `The ${label} option for TriviaGameOptions must be a number resolvable`,
          "INVALID_OPTION"
        );
      } else if (+val % 1 !== 0) {
        throw new DiscordTriviaError(
          `The ${label} option for TriviaGameOptions must be a whole integer`,
          "INVALID_OPTION"
        );
      } else if (+val < 1) {
        throw new DiscordTriviaError(
          `The ${label} option for TriviaGameOptions must be greater than or equal to 1`,
          "INVALID_OPTION"
        );
      }
    },

    checkPlayerCountRelation(min: number, max: number) {
      if (min > max)
        throw new DiscordTriviaError(
          "The maxPlayerCount option for TriviaGameOptions cannot be less than the minPlayerCountOption",
          "INVALID_OPTION"
        );
    },

    validatePointRange(label: "minPoints" | "maxPoints", val: unknown) {
      if (!val && val != 0) {
        throw new DiscordTriviaError(
          `A ${label} option for TriviaGameOptions is required`,
          "MISSING_OPTION"
        );
      } else if (typeof val != "number" && typeof val != "string") {
        throw new DiscordTriviaError(
          `The ${label} option for TriviaGameOptions must be of type number or string`,
          "INVALID_OPTION"
        );
      } else if (isNaN(+val)) {
        throw new DiscordTriviaError(
          `The ${label} option for TriviaGameOptions must be a number resolvable`,
          "INVALID_OPTION"
        );
      } else if (+val % 1 !== 0) {
        throw new DiscordTriviaError(
          `The ${label} option for TriviaGameOptions must be a whole integer`,
          "INVALID_OPTION"
        );
      } else if (+val < 1) {
        throw new DiscordTriviaError(
          `The ${label} option for TriviaGameOptions must be greater than or equal to 1`,
          "INVALID_OPTION"
        );
      }
    },

    checkPointRangeRelation(min: number, max: number) {
      if (min > max)
        throw new DiscordTriviaError(
          "The maxPoints option for TriviaGameOptions cannot be less than the minPoints",
          "INVALID_OPTION"
        );
    },

    validateTimePerQuestion(val: unknown) {
      if (!val && val != 0) {
        throw new DiscordTriviaError(
          `A timePerQuestion option for TriviaGameOptions is required`,
          "MISSING_OPTION"
        );
      } else if (typeof val != "number" && typeof val != "string") {
        throw new DiscordTriviaError(
          "The timePerQuestion option for TriviaGameOptions must be of type number or string",
          "INVALID_OPTION"
        );
      } else if (isNaN(+val)) {
        throw new DiscordTriviaError(
          "The timePerQuestion option for TriviaGameOptions must be a number resolvable",
          "INVALID_OPTION"
        );
      } else if (+val % 1 !== 0) {
        throw new DiscordTriviaError(
          "The timePerQuestion option for TriviaGameOptions must be a whole integer",
          "INVALID_OPTION"
        );
      } else if (+val < 1_000) {
        throw new DiscordTriviaError(
          "The timePerQuestion option for TriviaGameOptions must be greater than or equal to 1000ms",
          "INVALID_OPTION"
        );
      }
    },

    validateQuestionAmount(val: unknown) {
      if (!val && val != 0) {
        throw new DiscordTriviaError(
          `A questionAmount option for TriviaGameOptions is required`,
          "MISSING_OPTION"
        );
      } else if (typeof val != "number" && typeof val != "string") {
        throw new DiscordTriviaError(
          "The questionAmount option for TriviaGameOptions must be of type number or string",
          "INVALID_OPTION"
        );
      } else if (isNaN(+val)) {
        throw new DiscordTriviaError(
          "The questionAmount option for TriviaGameOptions must be a number resolvable",
          "INVALID_OPTION"
        );
      } else if (+val % 1 !== 0) {
        throw new DiscordTriviaError(
          "The questionAmount option for TriviaGameOptions must be a whole integer",
          "INVALID_OPTION"
        );
      } else if (+val < 1) {
        throw new DiscordTriviaError(
          "The questionAmount option for TriviaGameOptions must be greater than or equal to 1",
          "INVALID_OPTION"
        );
      }
    },

    validateQuestionDifficulty(val: unknown) {
      if (val === null) return;

      if (!val) {
        throw new DiscordTriviaError(
          `A questionDifficulty option for TriviaGameOptions is required`,
          "MISSING_OPTION"
        );
      } else if (typeof val != "string") {
        throw new DiscordTriviaError(
          `The questionDifficulty option for TriviaGameOptions must be a string`,
          "INVALID_OPTION"
        );
      } else if (!["easy", "medium", "hard"].includes(val.toLowerCase())) {
        throw new DiscordTriviaError(
          `Supplied questionDifficulty option (${val}) is not a questionDifficulty resolvable`,
          "INVALID_OPTION"
        );
      }
    },

    validateQuestionType(val: unknown) {
      if (val === null) return;

      if (!val) {
        throw new DiscordTriviaError(
          `A questionType option for TriviaGameOptions is required`,
          "MISSING_OPTION"
        );
      } else if (typeof val != "string") {
        throw new DiscordTriviaError(
          `The questionType option for TriviaGameOptions must be a string`,
          "INVALID_OPTION"
        );
      } else if (!["multiple", "boolean"].includes(val.toLowerCase())) {
        throw new DiscordTriviaError(
          `Supplied questionType option (${val}) is not a questionType resolvable`,
          "INVALID_OPTION"
        );
      }
    },

    validateQueueTime(val: unknown) {
      if (!val && val != 0) {
        throw new DiscordTriviaError(
          `A queueTime option for TriviaGameOptions is required`,
          "MISSING_OPTION"
        );
      } else if (typeof val != "number" && typeof val != "string") {
        throw new DiscordTriviaError(
          "The queueTime option for TriviaGameOptions must be of type number or string",
          "INVALID_OPTION"
        );
      } else if (isNaN(+val)) {
        throw new DiscordTriviaError(
          "The queueTime option for TriviaGameOptions must be a number resolvable",
          "INVALID_OPTION"
        );
      } else if (+val % 1 !== 0) {
        throw new DiscordTriviaError(
          "The queueTime option for TriviaGameOptions must be a whole integer",
          "INVALID_OPTION"
        );
      } else if (+val < 1_000) {
        throw new DiscordTriviaError(
          "The queueTime option for TriviaGameOptions must be greater than or equal to 1000ms",
          "INVALID_OPTION"
        );
      }
    },

    validateGameOptions(obj: TriviaGameOptions): void {
      try {
        this.validatePlayerCount("minPlayerCount", obj.minPlayerCount);
        this.validatePlayerCount("maxPlayerCount", obj.maxPlayerCount);
        this.validatePointRange("maxPoints", obj.maxPoints);
        this.validatePointRange("minPoints", obj.minPoints);

        this.checkPlayerCountRelation(obj.minPlayerCount!, obj.maxPlayerCount!);

        this.checkPointRangeRelation(obj.minPoints!, obj.maxPoints!);

        this.validateTimePerQuestion(obj.timePerQuestion);
        this.validateQuestionDifficulty(obj.questionDifficulty);
        this.validateQuestionAmount(obj.questionAmount);
        this.validateQuestionType(obj.questionType);
        this.validateQueueTime(obj.queueTime);
      } catch (err) {
        throw err;
      }
    },
  };
}
