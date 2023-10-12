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

export type Event = {
  action: string;
  guildId: string;
  description: string;
  keywords: string[];
  privacy: Privacy;
  responseType: ResponseType;
  isAllowedInGuild: (messageGuildId: string) => boolean;
};

type ActionEvent = {
  action: (...args: unknown[]) => void;
  responseType: ResponseType.action;
} & Exclude<Event, "action" | "responseType">;

const isActionEvent = (event: Event): event is ActionEvent => {
  return event.responseType === ResponseType.action;
};

export class EventHandler {
  private static events: Event[] = [];
  static addEvent(event: Event) {
    EventHandler.events.push(event);
  }

  static handleEvent(message: Message) {
    const keyword = message.content.split(" ")?.[0];
    const event = EventHandler.events.find((e) =>
      e.keywords.some((x: string) => x === keyword)
    );
    if (!event || !event.isAllowedInGuild(message.guildId)) return;
    if (isActionEvent(event)) {
      event.action(message, event.keywords);
    } else {
      switch (event.responseType) {
        case ResponseType.reply:
          message.reply(event.action);
          break;
        case ResponseType.react:
          message.react(event.action);
          break;
      }
    }
  }

  static makeEvent(
    keywords: string[],
    action: ((...args: unknown[]) => void) | string,
    responseType: ResponseType,
    description: string = "None",
    privacy = Privacy.private,
    guildId: string = ""
  ): Event {
    return {
      action,
      description,
      guildId,
      isAllowedInGuild: (messageGuildId: string) => {
        return privacy === Privacy.public || guildId === messageGuildId;
      },
      keywords,
      privacy,
      responseType,
    } as Event;
  }
}
