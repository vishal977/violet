# Violet
## A chatbot for Discord that comes with a lot of fun commands to use. Also capable of moderating servers. 
### Built with :heart: using Discord.JS and MongoDB.

#### If you wish to take the bot for a spin, you can join this test Discord server: [https://discord.gg/2tGkW65nHT](https://discord.gg/2tGkW65nHT "https://discord.gg/2tGkW65nHT")

##### *Otherwise, if you wish to host your own version of the bot, follow the steps below.* 
 
### Hosting the bot. 
- First of all, you will need the secret bot token from your Discord Developer Portal.
- You will also need a MongoDB connection URI (Database name: violet, Collection name: servers) and a Youtube Data v3 API token.
- Once you have them all, create a file called *config.json* in the root folder. Copy the JSON below and paste it there.
  ```
  {
   "prefix" : ";;",
   "jokesAPI" : "https://official-joke-api.appspot.com/",
   "dadJokesAPI" : "https://www.reddit.com/r/dadjokes/top/.json?sort=top&t=day&limit=400",
   "nextLevelAPI" : "https://www.reddit.com/r/nextfuckinglevel/top/.json?sort=top&t=day&limit=400",
   "showerThoughtsAPI" : "https://www.reddit.com/r/showerthoughts/top/.json?sort=top&t=day&limit=400",
   "triviaAPI" : "https://opentdb.com/api.php?amount=1&type=multiple&encode=base64",
   "redditOrange" : "#FF5700",
   "defaultWelcomeTitle" : "Ladies and Gentlemen, this is your captain speaking!!",
   "defaultWelcomeBody" : "--USER-- is now onboard!",
   "dburi": "YOUR_MONGO_DB_URI",
   "token": "YOUR_BOT_TOKEN",
   "youtubeapikey": "YOUR_YOUTUBE_DATA_API_KEY"
  }
  ```  
 - Replace YOUR_MONGO_DB_URI, YOUR_BOT_TOKEN, YOUR_YOUTUBE_DATA_API_KEY with the corresponding tokens/keys.
 - You can change the default API URLs for Dad jokes, trivia, shower thoughts and jokes but remember, you need to edit the command's code to handle the response properly.
 - Now, click on the *OAuth2* tab on the portal, scroll down to *Scopes*, select *Bot* . Then, go down to the *Bot Permissions* section, select *Administrator*. Copy the URL that the *Scopes* section generates for you.
 - Paste the URL in your browser. In the portal that opens, you can invite the bot to one of your Discord servers.
  
  :warning: Never push your code to GitHub with your bot token exposed. Anyone with the token can use the bot as if it was theirs.
  
- To install dependencies, open command prompt and type in
```
npm init
```
- Dependencies installed? Now we're good to go! Type the command below
```
node violet.js 
(or if you have nodemon installed)
nodemon violet.js
```
*Once you run this command, your bot should be up and running and will be Online in your Discord server*

*Note: The YouTube music commands might not work due to changes to YouTube's API policies*
  
  
