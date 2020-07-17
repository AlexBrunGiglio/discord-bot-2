const Discord = require("discord.js")
const config = require("./botconfig.json")

const bot = new Discord.Client({disableEveryone: true});

let mutedChannels = [];
let modRoleID = "234313412102979586"; // Make sure to replace this number with moderator role id for your server.
let everyoneID = "421015013147279362";
let mutedMembers = [];

let rulesEmbed = new Discord.MessageEmbed();
let welcomeEmbed = new Discord.MessageEmbed();
let botInfoEmbed = new Discord.MessageEmbed();

rulesEmbed.setTitle("Server Rules") // This is the server rules message that is sent when *rules is run, or in the DMs of new members.
.setColor("#0dff4d")
.addField(name = "1.",value = "Be respectful to all members of the server.") 
.addField(name = "2.",value = "Do not spam.")
.addField(name = "3.",value = "Do not upload any malicious links.")

welcomeEmbed.setTitle("Bienvenue sur We Are Gamers !") // This is the server welcome message that is sent in the DMs of new members.
.setColor("#30B1E5")
.setThumbnail("https://images-ext-1.discordapp.net/external/8ejf4mlVIWzN2qrbiSPnHEMrQ_NvG72nes1Kn6VGTMA/https/media.discordapp.net/attachments/416477999698018314/689834041326698627/t.gif")
.addField(name = "🔹",value = "Nous espérons que tu vas t'amuser !\nSoit sûr de lire le <#416478130614697994> !\n\n__**Voici les liens du WAG :**__\n\n[Site Internet](https://wearegamers.online/) | [Youtube](https://www.youtube.com/channel/UCi7qtDdexjU-07KDdDFOsNw) | [Twitch](https://www.twitch.tv/weareonlive) | [Utip](https://utip.io/wearegamers) | [Invite tes amis](https://discord.gg/uNpSbZr)")

botInfoEmbed.setTitle("We Are Bot Info") // This is the commands list that is displayed when *info command is run
.setColor("#0dff4d")
.addField(name = "*valider",value =  "Permet d'acceder à l'ensemble du serveur et valider le réglement.")
// .addField(name = "*rules",value = "Affiche les règles du serveur.")
.addField(name = "*modo",value =  "Permet d'appeler l'aide d'un modérateur. Les modérateurs sont avertis de l'usage de cette commande. Ex : *modo: (Raison) *modo: Quelqu'un me spam.")
.addField(name = "*kick",value =  "Utilisé pour kick un membre du serveur : *kick @example Spam.")
.addField(name = "*ban",value =  "Utilisé pour ban un membre du serveur : *ban @exemple Spam.")
.addField(name = "*unban",value =  "Utilisé pour unban un membre du serveur : *unban @exemple Spam.")
.addField(name = "*mute",value =  "Utilisé pour mute un membre du serveur : *mute @exemple Spam.")
.addField(name = "*unmute",value =  "Utilisé pour unmute un membre du serveur : *unmute @exemple Spam.")
.addField(name = "*disablechannel",value =  "Utilisé pour mute les messages d'un channel. Tout message provenant d'un channel mute est automatiquement supprimé.")
.addField(name = "*activatechannel",value =  "Utilisé pour unmute les messages d'un channel.")
.addField(name = "*clear",value =  "Supprime les messages d'un channel. Par defaut 50 | limite 100.")


console.log("Le bot" + " est entrain de se lancer...")

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
}
bot.on('guildMemberAdd', member => {
    member.send(welcomeEmbed);
});

bot.on("ready", async () => {
    console.log(bot.user.username + " est en ligne.")
    bot.user.setActivity("être utile")
});  

bot.on("guildCreate", guild => {
    console.log("Le bot à rejoins un nouveau serveur : " + guild.name);
})


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    const commandPrefix = config.prefix;
    let msgArray = message.content.split(" ");
    let cmdArgs = msgArray.slice(1, 2);
    let cmdArgs2 = msgArray.slice(2);
    let cmdArgsNum = parseInt(cmdArgs);
    let command = msgArray[0];
    let msgFiltered = msgArray.map(str => str.replace(/\s/g, ''));
    let words = msgFiltered.length;
    let reasonFor;
    let messageChannelMuted = false;

    for(i = 0; i <= cmdArgs2.length; i++){
        if(cmdArgs2[i] != undefined){
            if(i > 0){
                reasonFor += cmdArgs2[i] + " ";
            }
            else{
                reasonFor = cmdArgs2[i] + " ";
            }
        }
    }

    for(i = 0; i <= mutedMembers.length - 1; i++){
        if(message.author.id != mutedMembers[i].toString()){
            null
        }
        else{
            message.delete();
            message.author.send("Vous ne pouvez pas envoyer de message sur ce serveur. Vous avez étez mute !")
        }
    }

    for(i = 0; i <= mutedChannels.length; i++){
        if(message.channel.id == mutedChannels[i]){
            messageChannelMuted = true;
        }
    }

    if(messageChannelMuted == true){
        wait(2000);
        message.delete();
    }

    if(message.content.toLowerCase().startsWith(commandPrefix + "info")){
        return message.channel.send(botInfoEmbed);
    }

    if(message.content.toLowerCase().startsWith(commandPrefix + "rules")){
        return message.channel.send(rulesEmbed);
    }

    if(message.content.toLowerCase().startsWith(commandPrefix + "disablechannel")){
        if(message.member.hasPermission("ADMINISTRATOR")){
            let msgChannelMuted = false;
                for(i = 0; i <= mutedChannels.length - 1; i++){
                    if(message.channel.id == mutedChannels[i]){
                        msgChannelMuted = true;
                    }
                }

            if(msgChannelMuted == false){
                mutedChannels.push(message.channel.id);
                message.channel.send("Ce channel est bloqué");
            }
            else{
                message.channel.send("Ce channel était déjà bloqué !");
            }
        }
        else{
            message.channel.send("Vous n'avez pas la permission pour cette commande !");
        }
    }

    if(message.content.toLowerCase().startsWith(commandPrefix + "activatechannel")){
        if(message.member.hasPermission("ADMINISTRATOR")){
            let msgChannelMuted = false;
                for(i = 0; i <= mutedChannels.length - 1; i++){
                    if(message.channel.id == mutedChannels[i]){
                        msgChannelMuted = true;
                    }
                }

            if(msgChannelMuted == true){
                channelIndex = mutedChannels.indexOf(message.channel.id);
                mutedChannels.pop(channelIndex);
                message.channel.send("Ce channel a été débloqué !");
            }
            else{
                message.channel.send("Ce channel n'était pas bloqué");
            }
        }
        else{
            message.channel.send("Vous n'avez pas la permission pour cette commande !");
        }
    }

    if (message.content.toLowerCase().startsWith(commandPrefix + "kick")) {  
        if(message.member.hasPermission("KICK_MEMBERS")){
            let memberToKick = message.mentions.members.first();
            let memberKicking = message.author.toString();
            let serverOnWhichKicked = message.guild.toString();

            memberToKick.send("Vous avez été exclu par un membre du staff :" + memberKicking + " sur le serveur " + serverOnWhichKicked + "." + " Raison : " + reasonFor);

            
            const kickInfoEmbed = new Discord.MessageEmbed()
            .setTitle("Kick Info")
            .setColor("#f58a42")
            .addField(name = "Membre exclu :",value =  memberToKick)
            .addField(name = "Exclu par :",value =  memberKicking)
            .addField(name = "Raison :",value = reasonFor);

            message.channel.send(kickInfoEmbed);

            memberToKick.kick(reasonFor);
        }
        else{
            message.author.send(message.author.toString() + ", désolé mais cette commande ne t'es pas accessible. Merci de contacter un administrateur.");
            message.delete();
        }
    }

    if (message.content.toLowerCase().startsWith(commandPrefix + "ban")) {  
        if(message.member.hasPermission("BAN_MEMBERS")){
            let memberToBan = message.mentions.members.first();
            let memberBanning = message.author.toString();
            let serverOnWhichBanned = message.guild.toString();

            memberToBan.send("Vous avez été banni par un membre du staff " + memberBanning + " sur le serveur " + serverOnWhichBanned + "." + " Raison : " + reasonFor);

            
            const banInfoEmbed = new Discord.MessageEmbed()
            .setTitle("Ban Info")
            .setColor("#f70505")
            .addField(name = "Membre banni :",value =  memberToBan)
            .addField(name = "Banni par :",value =  memberBanning)
            .addField(name = "Raison :",value = reasonFor);

            message.channel.send(banInfoEmbed);

            memberToBan.ban(reasonFor);
        }
        else{
            message.author.send(message.author.toString() + ", désolé mais cette commande ne t'es pas accessible. Merci de contacter un administrateur.");
            message.delete();
        }
    }

    if (message.content.toLowerCase().startsWith(commandPrefix + "unban")) {  
        if(message.member.hasPermission("BAN_MEMBERS")){
            let memberToUnBan = cmdArgs[0];
            let memberUnBanning = message.author.toString();

            message.guild.fetchBans();

            const unBanInfoEmbed = new Discord.MessageEmbed()
            .setTitle("Unban Info")
            .setColor("#00fa15")
            .addField(name = "Unbanned membre id :",value =  memberToUnBan)
            .addField(name = "Unbanned par :",value =  memberUnBanning)

            try{
                message.guild.members.unban(memberToUnBan);
                message.channel.send(unBanInfoEmbed);
            } catch(errorName) {
                console.log(errorName);
            }

        }
        else{
            message.author.send(message.author.toString() + ", désolé mais cette commande ne t'es pas accessible. Merci de contacter un administrateur.");
            message.delete();
        }
    }
        if (message.content.toLowerCase().startsWith(commandPrefix + "clear")) {
            if(message.member.hasPermission("MANAGE_MESSAGES")){
            async function clearMsg() {    
                if(Number.isInteger(cmdArgsNum) == true && cmdArgsNum <= 100){
                    deleteMsgAmount = cmdArgsNum;
                }
                else{    
                    deleteMsgAmount = 100;
                }
                message.delete();
                const fetchedMsg = await message.channel.messages.fetch({limit: deleteMsgAmount});
                message.channel.bulkDelete(fetchedMsg);
            }
            clearMsg();
            }
            else{
                message.author.send(message.author.toString() + ", désolé mais cette commande ne t'es pas accessible. Merci de contacter un administrateur.");
                message.delete();
            }
        }

        if(message.content == commandPrefix + "valider"){
            message.member.roles.add(['234300184123801601']); //WAG SERVEUR // add the role id you wish to set once a member uses *sign command
            //message.member.roles.add(['701722821835096145']); //WAG TEST // add the role id you wish to set once a member uses *sign command
            message.author.send("Vous avez accepté le réglement un rôle vous a été donné !");
        }

        if(message.content.startsWith(commandPrefix + "modo")){
            reason = message.content.split(":")
            reason = reason[1]
            let randomNum = Math.floor(Math.random() * 99999);
            let randomChannelName = "modo-support-" + randomNum.toString();

            message.channel.send("Bonjour, " + message.author.toString() + ". Votre demande a été transmise aux modérateurs du serveur. Un channel vocal : " + randomChannelName + " a été créer pour vous. Merci de vous y connecter afin qu'un modérateur puisse vous aider.")

            message.guild.members.cache.forEach( (member) => {
                if(member.roles.cache.has(modRoleID)) {
                    member.send(`Bonjour, ` + message.author.username +  " demande de l'aide. Raison du ticket : " + reason + ". Un channel vocal " + randomChannelName + " a été créer pour régler ce problème !"); 
                }
            })

            message.guild.channels.create(randomChannelName, { type: 'voice', userLimit: '2' });
        }

        if(message.content.startsWith(commandPrefix + "membre")){
            if(message.member.hasPermission("ADMINISTRATOR")){
                reason = message.content.split(":")
                reason = reason[1]
                const messageMembre = new Discord.MessageEmbed()
                            .setTitle("Message des admins")
                            .setColor("#f58a42")
                            .setDescription(reason)
                            .setThumbnail('https://media.discordapp.net/attachments/416477999698018314/689834041326698627/t.gif?width=465&height=465')
                            .setFooter(message.author.username)
                            .setTimestamp()

                message.channel.send("Bonjour, " + message.author.toString() + ". Votre demande a été transmise aux membres du serveur.")

                message.guild.members.cache.forEach( (member) => {
                    if(member.roles.cache.has(everyoneID)) {
                        member.send(messageMembre);
                    }
                })
            }
        }

        if(message.content.startsWith(commandPrefix + "mute")){
            if(message.member.hasPermission("BAN_MEMBERS") || message.member.hasPermission("KICK_MEMBERS")){
                let memberAlreadyMuted = false;
                let mutedMember = message.mentions.members.first();

                for(i = 0; i <= mutedMembers.length - 1; i++){
                    if(mutedMember.id == mutedMembers[i].toString()){
                        memberAlreadyMuted = true;
                    }
                }

                if(memberAlreadyMuted == false){
                    let memberMuting = message.author.toString();
                    mutedMembers.push(mutedMember.id);

                    mutedMember.send("Vous avez été mute !")

                    const muteInfoEmbed = new Discord.MessageEmbed()
                        .setTitle("Mute Info")
                        .setColor("#f58a42")
                        .addField(name = "Membre mute :",value =  mutedMember)
                        .addField(name = "Mute par :",value =  memberMuting)

                    message.channel.send(muteInfoEmbed);
                }
                else{
                    message.channel.send("Ce membre est déjà mute !")
                }
            }
            else{
                message.author.send(message.author.toString() + ", désolé mais cette commande ne t'es pas accessible. Merci de contacter un administrateur.");
                message.delete();
            }
        }

        if(message.content.startsWith(commandPrefix + "unmute")){
            if(message.member.hasPermission("BAN_MEMBERS") || message.member.hasPermission("KICK_MEMBERS")){
                let memberAlreadyMuted = false;
                let mutedMember = message.mentions.members.first();

                for(i = 0; i <= mutedMembers.length - 1; i++){
                    if(mutedMember.id == mutedMembers[i].toString()){
                        memberAlreadyMuted = true;
                    }
                }

                if(memberAlreadyMuted == true){
                    let memberMuting = message.author.toString();
                    let unmutedMemberIndex = mutedMembers.indexOf(mutedMember.id);

                    mutedMembers.pop(unmutedMemberIndex);

                    mutedMember.send("Vous avez été demute !")

                    const muteInfoEmbed = new Discord.MessageEmbed()
                        .setTitle("Unmute Info")
                        .setColor("#f58a42")
                        .addField(name = "Membre demute :",value =  mutedMember)
                        .addField(name = "Demute par :",value =  memberMuting)

                    message.channel.send(muteInfoEmbed);
                }
                else{
                    message.channel.send("Ce membre n'est pas mute !")
                }
            }
        }
});  
 
bot.login(config.token)