# Weather ChatBot

A simple chatbot that answers questions based on the weather and provides instant weather details for a given city.

## Features

- Ask any question and get an answer influenced by current weather.
- Get real-time weather data for any city.
- Clean and user-friendly UI.

## Technologies Used

- **HTML/CSS** – Frontend layout and styling
- **node.js** – Handles form submission and API calls
- **Weather API + AI Bot API** – Powers the backend responses

---

website is live at https://clima-bot-ashen.vercel.app/



### Endpoints

- `POST /ask` - Accepts a JSON payload with the following parameters:
  - `input`: The user's question.
  - `city`: The city name for fetching weather data.

