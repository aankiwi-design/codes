import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import pino from "pino";
import handler from "./case.js";
import { setting } from "./setting.js";

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    auth: state
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0];
    if (!m.message) return;

    const text =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      "";

    if (!text.startsWith(".")) return;

    const command = text.slice(1).split(" ")[0].toLowerCase();

    m.reply = (txt) => {
      sock.sendMessage(m.key.remoteJid, { text: txt }, { quoted: m });
    };

    try {
      await handler(m, sock, command);
    } catch (e) {
      console.log(e);
      m.reply("Error bang");
    }
  });

  console.log(`ðŸ¤– ${setting.botName} aktif!`);
}

startBot();
