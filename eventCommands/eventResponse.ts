import { Message } from "discord.js";

export enum ResponseType {
  reply,
  react,
  action,
  listener,
}

export enum Privacy {
  public,
  private,
}

export type Command = {
  action: ((...args: any[]) => void) | string;
  guildId: string;
  description: string;
  keywords: string[];
  privacy: Privacy;
  responseType: ResponseType;
  handleResponse: (e: Message) => void;
  isAllowedInGuild: (messageGuildId: string) => boolean;
};

export function MakeCommand(
  keywords: Command["keywords"],
  action: Command["action"],
  responseType: Command["responseType"],
  description: Command["description"] = "None",
  privacy: Command["privacy"] = Privacy.private,
  guildId: Command["guildId"] = ""
): Command {
  return {
    action,
    description,
    guildId,
    isAllowedInGuild: (messageGuildId: string) => {
      return privacy === Privacy.public || guildId === messageGuildId;
    },
    handleResponse: (e: Message) => {
      switch (responseType) {
        case ResponseType.reply:
          if (typeof action === "string") e.reply(action);
          break;
        case ResponseType.react:
          if (typeof action === "string") e.react(action);
          break;
        case ResponseType.action:
          if (typeof action === "function") action(e, keywords);
          break;
      }
    },
    keywords,
    privacy,
    responseType,
  };
}
