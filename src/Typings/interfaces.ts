import {
  Collection,
  ColorResolvable,
  GuildMember,
  Snowflake,
} from "discord.js";
import {
  CategoryResolvable,
  QuestionDifficulty,
  QuestionType
} from "easy-trivia";
import { TriviaCommandBuilderType, TriviaGameOptionKeys } from "./types";

export interface CanvasGeneratorOptions {
  font: string;
}

export interface DiscordTriviaErrorMessages {
  [key: string]: {
    message: string;
    header: string;
  };
}

export interface LockedGameOptionsEntry {
  optionName: TriviaGameOptionKeys;
  value: string | number | null;
}

export interface TriviaCommandBuilderOptions {
  name: string;
  description: string;
  type: TriviaCommandBuilderType;
}

export interface TriviaGameData {
  hostMember: GuildMember;
  players: Collection<Snowflake, TriviaPlayer>;
}

export interface TriviaGameOptions {
  minimumPlayerCount: number;
  maximumPlayerCount: number;
  timePerQuestion: number;
  triviaCategory: CategoryResolvable | null;
  questionAmount: number;
  questionDifficulty: QuestionDifficulty | null;
  questionType: QuestionType | null;
  queueTime: number;
  minimumPoints: number;
  maximumPoints: number;
}

export interface TriviaManagerOptions {
  theme: ColorResolvable;
}

export interface TriviaPlayer extends GuildMember {
  points: number;
  hasAnswered: boolean;
  isCorrect: boolean;
}
