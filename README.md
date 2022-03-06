![Banner](Images/banner.svg)

# Discord Trivia
### **⚠️ This project is still a WIP**
Easily integrate trivia games into your Discord.js client with only a few of code!

Testing Phase

1️⃣ Step 1:

Clone discord-trivia from github
git clone https://github.com/Elitezen/discord-trivia.git


2️⃣ Step 2:

Integrate the following into your trivia command file:
```js
// Namespace
const { TriviaManager } = require("../../discord-trivia");

// Command function
const trivia = new TriviaManager();
const game = trivia.createGame(interaction);

try {
    await game.start();
} catch (err) {
    console.error(err);
}
```

# Docs
The docs are coming soon!

# Support Server
[![](http://invidget.switchblade.xyz/wtwM4HhbAr)](https://discord.gg/wtwM4HhbAr)