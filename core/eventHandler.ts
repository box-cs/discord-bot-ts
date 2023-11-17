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
};

export class EventHandler {
  private static events: BaseEvent[] = [];
  static addEvent(event: BaseEvent) {
    EventHandler.events.push(event);
  }

  static handleEvent(message: Message) {
    const messageContent = message.content;
    const events = EventHandler.events;
    const event = events
      .filter(
        (x) => x.guildId === message.guildId || x.privacy === Privacy.public
      )
      .find((event) =>
        event.keywords.some(
          (keyword) => keyword === messageContent?.split(" ")?.[0]
        )
      );
    if (!event) return;
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
      keywords,
      privacy,
    };
  }
}
