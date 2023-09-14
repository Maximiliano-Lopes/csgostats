const express = require("express");
const cors = require('cors')
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())

app.get("/stats",  async (req, res) => {
    try {
        const apiResponse = await fetch(
         'https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&&steamid=76561198413926719&key=')
        const apiResponseJson = await apiResponse.json()
    
        res.json(apiResponseJson.playerstats.stats);
      } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
      }
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});