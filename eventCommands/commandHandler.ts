import { Message } from "discord.js";
import { Command, ResponseType } from "./eventResponse";

class CommandHandler {
  static events: Command[] = [];

  static addCommand(event: Command) {
    CommandHandler.events.push(event);
  }

  static handleCommand(e: Message) {
    const keyword = e.content.split(" ")?.[0];
    const command = CommandHandler.events.find((e) =>
      e.keywords.some((x) => x === keyword)
    );
    if (!command) return;

    const listeners = CommandHandler.events.filter(
      (e) => e?.responseType === ResponseType.listener
    );

    if (!command.isAllowedInGuild(e.guildId)) return;

    for (const listener of listeners) {
      if (typeof listener?.action !== "function") return;
      listener?.action(e, keyword);
    }

    command.handleResponse(e);
  }
}

export { CommandHandler };
