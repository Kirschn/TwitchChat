/**
 * Created by mcwmc on 12.03.2016.
 */
console.log("Started client");
var irc = require("node-irc");
var username = "thekirschn",
    token = "oauth:19azh7s4bmy0unyuuo5yehugorcmyc";
var mods = [];
var client = new irc.Client('irc.twitch.tv', username,
    {
        userName: username, // IRC Name
        realName: username, // Wird nicht wirklich gebraucht
        port: 6667,
        localAddress: null,
        debug: true, // Nur für Testinstanz an, genz nützlich um Pings, gesendete Nachrichten etc. zu sehen
        showErrors: true,
        autoRejoin: true,
        autoConnect: true,
        channels: [],
        secure: false,
        selfSigned: false,
        certExpired: false,
        floodProtection: false,
        floodProtectionDelay: 1000,
        sasl: false,
        stripColors: false,
        channelPrefixes: "&#",
        messageSplit: 999, // 999 ist maximale Twitch Nachrichtenlänge
        encoding: '',
        password: token // Wirde zuvor festgelegt aus A) Stdin B) Config File
    }
);
var groupchatclient = new irc.Client('199.9.253.119', username,
    {
        userName: username, // IRC Name
        realName: username, // Wird nicht wirklich gebraucht
        port: 6667,
        localAddress: null,
        debug: true, // Nur für Testinstanz an, genz nützlich um Pings, gesendete Nachrichten etc. zu sehen
        showErrors: true,
        autoRejoin: true,
        autoConnect: true,
        channels: [],
        secure: false,
        selfSigned: false,
        certExpired: false,
        floodProtection: false,
        floodProtectionDelay: 1000,
        sasl: false,
        stripColors: false,
        channelPrefixes: "&#",
        messageSplit: 999, // 999 ist maximale Twitch Nachrichtenlänge
        encoding: '',
        password: token // Wirde zuvor festgelegt aus A) Stdin B) Config File
    }
);


var clientaws = new irc.Client('irc.chat.twitch.tv', username,
    {
        userName: username, // IRC Name
        realName: username, // Wird nicht wirklich gebraucht
        port: 80,
        localAddress: null,
        debug: true, // Nur für Testinstanz an, genz nützlich um Pings, gesendete Nachrichten etc. zu sehen
        showErrors: true,
        autoRejoin: true,
        autoConnect: true,
        channels: [],
        secure: false,
        selfSigned: false,
        certExpired: false,
        floodProtection: false,
        floodProtectionDelay: 1000,
        sasl: false,
        stripColors: false,
        channelPrefixes: "&#",
        messageSplit: 999, // 999 ist maximale Twitch Nachrichtenlänge
        encoding: '',
        password: token // Wirde zuvor festgelegt aus A) Stdin B) Config File
    }
);
client.send('CAP', 'REQ', 'twitch.tv/commands');
clientaws.send('CAP', 'REQ', 'twitch.tv/commands');
function whisper(username, message) {
    groupchatclient.send("PRIVMSG", "#jtv", "/w " + username + " " + message);
}
function join(channel) {
    client.join(channel);
    client.say(channel, "/mods");

}
function handlemessage(message, channel, username) {
    console.log(message);
}
client.on('raw', function (message) {
    console.log(message);
    if (message.args[1] == "Error logging in" && message.command == "NOTICE") {
        alert("Login error");
    } else if ((message.args[1] !== undefined) && message.command == "NOTICE") {
        if (message.args[1].replace("The moderators of this room are: ", "") !== message.args[1]) {
            mods[message.args[0]] = message.args[1].replace("The moderators of this room are: ", "").split(", ");
        }


    }
});
clientaws.on('raw', function (message) {
    console.log(message);
    if (message.args[1] == "Error logging in" && message.command == "NOTICE") {
        alert("Login error");
    } else if ((message.args[1] !== undefined) && message.command == "NOTICE") {
        if (message.args[1].replace("The moderators of this room are: ", "") !== message.args[1]) {
            mods[message.args[0]] = message.args[1].replace("The moderators of this room are: ", "").split(", ");
            var stringbuild = "<ul>";
            mods[message.args[0]].forEach(function(current) {
                stringbuild +="<li>"+current+"</li>";
            });
            stringbuild+="<ul>";
            console.log(stringbuild);
        }


    }
});
client.on('message', function (username, channel, text) {
    handlemessage(text, channel, username);
});
clientaws.on('message', function (username, channel, text) {
    handlemessage(text, channel, username);
});
join("#thekirschn");