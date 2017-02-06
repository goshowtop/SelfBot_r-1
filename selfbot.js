const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "-"
const server = "Nights Of Valor"
const invitelink = "https://discord.gg/4suNThV"
const n1 = "weareno1 "
var newUsers = new Discord.Collection();
const fs = require("fs");
var shortcuts = new Map([
  ["lenny", "( ͡° ͜ʖ ͡°)"],
  ["shrug", "¯\\_(ツ)_/¯"],
  ["justright", "✋😩👌"],
  ["tableflip", "(╯°□°）╯︵ ┻━┻"],
  ["unflip", "┬──┬﻿ ノ( ゜-゜ノ)"],
  ["2flip", "┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻"],
  ["allflip", "┻━┻ ︵┻━┻ ︵┻━┻ ︵┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻︵﻿ ┻━┻︵﻿ ┻━┻︵﻿ ┻━┻"]
]);
client.on("ready", () => {
  console.log('Thanks for Loading me!')
  client.user.setGame('with some JS.')
});
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
client.on('message', message => {
  const params = message.content.split(" ");
  const command = params.shift().slice(prefix.length);

  if(message.content.startsWith(prefix+"eval")) {
    if(message.author !== client.user) return;
    try {
      var code = params.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", clean(evaled));   
    } catch(err) {
      message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});
client.on("message", msg => {
  const params = msg.content.split(" ").slice(1);
  if(msg.author !== client.user) return;
  if (msg.content.startsWith(prefix + 'faces')) {
  let [what, pro, pro2] = msg.content.split(" ").slice(1);
  if (what === "help")
    if (pro === 'help')
      msg.delete()
      msg.channel.sendMessage("BarredGalaxy's Emote Selfbot!\n \nSmiles:\n`lenny` `2flip` `bee`")
  }
  if (msg.content.startsWith(prefix + "asciilove")) {
  	msg.edit('💕 With Love From Barred! 💕')
  	msg.channel.sendMessage('```\n          ******       ******\n        **********   **********\n      ************* *************\n     *****************************\n     *****************************\n     *****************************\n      ***************************\n        ***********************\n          *******************\n            ***************\n              ***********\n                *******\n                  ***\n                   *```')
  }
  if (msg.content.startsWith(prefix + "slap")) {
   let [username] = msg.content.split(" ").slice(1);
     msg.channel.sendMessage(username + ' was slapped by ' + msg.author)
}
  if (msg.content.startsWith(prefix + "offtopic")) {
  let [what, desc, pro2] = msg.content.split(" ").slice(1);
    msg.delete()
    msg.channel.sendMessage(what + ", move to <#246872804664803329> you skrub!")
}
  if (msg.content.startsWith(prefix + "talk")) {
  let [what, desc, pro2] = msg.content.split("|").slice(1);
    msg.delete()
    msg.channel.sendMessage("", {embed: {
            color: 2012323,
            author: {
                 name: what,
                icon_url: pro2
            },
            description: desc,
            fields: [
            ]
        }});
}
  if (msg.content.startsWith(prefix + 'setgame'))
    msg.edit('```js\nclient.on("ready", () => {\n  client.user.setGame("Half-Life 3")\n});\n```')
  if(msg.content.startsWith(prefix + "prune")) {
    let messagecount = parseInt(params[0]);
    msg.channel.fetchMessages({limit: 100})
    .then(messages => {
      let msg_array = messages.array();
      msg_array = msg_array.filter(m => m.author.id === client.user.id);
      msg_array.length = messagecount + 1;
      msg_array.map(m => m.delete().catch(console.error));
   });
  }
  var command_name = msg.content.slice(1);
  if(shortcuts.has(command_name)) {
    setTimeout( () => { msg.edit(shortcuts.get(command_name)) }, 50);
    return;
  }
});

client.login("WHY HELLO THERE!")