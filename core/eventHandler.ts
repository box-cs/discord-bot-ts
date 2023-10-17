import { Message } from "discord.js";

export enum ResponseType {
  send,
  reply,
  react,
  action,
}

export enum Privacy {
  public,
  private,
}

export type BaseEvent = {
  action: ((message: Message) => void) | string;
  guildId: string;
  description: string;
  keywords: string[];
  privacy: Privacy;
  responseType: ResponseType;
  isAllowedInGuild: (messageGuildId: string) => boolean;
};

export class EventHandler {
  private static events: BaseEvent[] = [];
  static addEvent(event: BaseEvent) {
    EventHandler.events.push(event);
  }

  static handleEvent(message: Message) {
    const messageContent = message.content;
    const events = EventHandler.events;
    const event = events.find((event) =>
      event.keywords.some(
        (keyword) => keyword === messageContent?.split(" ")?.[0]
      )
    );
    const isAllowedInGuild =
      event?.privacy === Privacy.public || event?.guildId === message.guildId;
    if (!event || !isAllowedInGuild) return;
    switch (event.responseType) {
      case ResponseType.reply:
        message.reply(event.action as string);
        break;
      case ResponseType.send:
        message.channel.send(event.action as string);
        break;
      case ResponseType.react:
        message.react(event.action as string);
        break;
      case ResponseType.action:
        if (typeof event.action === "function") event?.action?.(message);
        break;
    }
  }

  static makeEvent(
    keywords: string[],
    action: ((message: Message) => void) | string,
    responseType: ResponseType,
    description: string = "None",
    privacy = Privacy.private,
    guildId: string = ""
  ) {
    return {
      action,
      description,
      guildId,
      responseType,
      isAllowedInGuild: (messageGuildId: string) => {
        return privacy === Privacy.public || guildId === messageGuildId;
      },
      keywords,
      privacy,
    };
  }
}
