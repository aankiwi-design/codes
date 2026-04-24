import { setting } from "./setting.js";

export default async function handler(m, sock, command) {
  switch (command) {

    case 'menu': {
      m.reply(`
╭───「 ${setting.botName} 」
│ Owner : ${setting.ownerName}
│ Developer : ${ownerName}
│ version: ${version}
╰────────────

 *Menu Bot*
{{MENU_CONTENT}}
      `);
    }
    break;

    // === AUTO GENERATED ===
    {{CASE_CONTENT}}
    // === END ===

    default:
      m.reply("Command tidak ditemukan, ketik .menu");
  }
}
