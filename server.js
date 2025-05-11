const express = require("express");
const app = express();
const PORT = 3000;
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
const apiKey = process.env.GROQ_API_KEY;
app.use(cors());
app.post('/ask', async (req, res) => {
  const { input, city } = req.body; 

  if (!input || !city) {
    return res.status(400).json({ error: "Please provide both input prompt and city name" });
  }


  let weatherData = {};
  try {
    const weatherResponse = await fetch(`https://wttr.in/${city}?format=j1`);
    const weatherJson = await weatherResponse.json();
    const current = weatherJson.current_condition[0];
    weatherData = {
      city,
      temperature: current.temp_C + " °C",
      description: current.weatherDesc[0].value,
      feels_like: current.FeelsLikeC + " °C"
    };
  } catch (error) {
    console.error("Weather API error:", error);
    return res.status(500).json({ error: "Failed to fetch weather data" });
  }


  const formattedInput = `${input} The weather in ${city} is ${weatherData.temperature} with ${weatherData.description}. It feels like ${weatherData.feels_like}.`;

  let botReply = "";
  try {
    const botResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", 
        messages: [
          { role: "user", content: formattedInput }
        ]
      })
    });

    const botData = await botResponse.json();
    botReply = botData.choices?.[0]?.message?.content || "No response received from bot";
  } catch (err) {
    console.error("Bot API error:", err);
    return res.status(500).json({ error: "Failed to fetch bot response" });
  }


  res.json({
    botReply,    
    weatherData   
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
