Link to add bot to your server: https://discord.com/api/oauth2/authorize?client_id=715513848609636414&permissions=8&scope=bot

CHANGES REQUIRED TO THE CODE:

You will have to add the required role id-s for your server. You will have to find and change the following lines of code (I have also added comments on the following lines so that you
can find them more easily):

let modRoleID = "717328546871246928"; - replace the number here with the role id of the moderator role on your server

 if(message.content == commandPrefix + "sign"){
            message.member.roles.set(['717328546871246928']); - replace this number with the role id of the role that should be assigned to members when they agree to the server rules by typing *sign
	    ...
 }

You can also modify the *rules and *info command text as you wish. You can also customise the DM message that is sent to new members on join (NOTE: as a bot requirement you have requested
I add a function that would prevent random welcome messages on the actual server, but that cannot be done with a bot, but rather has to be changed within server settings. You can turn off
the welcome messages by going to server settings, then overview and finally changing the "Send a random welcome message when user joins this server." to off.)

BOT FEATURES:

*sign
By running this command, you agree to the server rules. Once you run it, you will receive a role.

*rules
Displays the rules of the server.

*modo
Used to request help from the server moderators. When run, all moderators will receive your request. Usage: *modo:(Reason) For example: *modo:I am getting spammed.

*kick
Used to kick a member of the sevrer. Usage: *kick (USER MENTION) (REASON) For example: *kick @example Spamming.

*ban
Used to ban a member of the sevrer. Usage: *ban (USER MENTION) (REASON) For example: *ban @example Spamming.

*unban
Used to unban a member of the server. Usage *unban (USER ID)

*mute
Used to mute a member of the sevrer. Usage: *mute (USER MENTION) (REASON) For example: *mute @example Spamming.

*unmute
Used to unmute a member of the sevrer. Usage: *unmute (USER MENTION) For example: *unmute @example

*mutechannel
Used to mute a channel. Any message from a muted channel is automatically deleted. Run this command in a server you wish to mute.

*unmutechannel
Used to unmute a channel. Run this command in a server you wish to unmute.

*clear
Deletes the amount of messages you specify (deafult amount is 50 and the specified amount cannot be more than 100).

*info 
Displays all bot commands.

- Once a new user joins the server, a DM welcome message is sent to him. Also, the user is sent the server rules and he is informed that he needs to do the *sign command to agree to the 
rules and get a role.

If you need any help, or have any questions, please feel free to contact me on Fiverr.