# Mineflayer-OpenAI

Mineflayer-OpenAI is a Minecraft bot that leverages the power of OpenAI's GPT-3.5-turbo model. The bot is capable of interpreting Minecraft chat messages and executing corresponding behaviors based on the context of the chat message.

## Features

- **Chat Interpretation**: The bot can interpret chat messages and determine the appropriate behavior to execute.
- **Behaviors**: The bot can execute a variety of behaviors based on the interpreted chat message.
- **OpenAI Integration**: The bot uses OpenAI's GPT-3.5-turbo model for chat interpretation.

## Project Structure

The project is organized as follows:

```
/home/skele/mineflayer-openai
├── LICENSE
├── README.md
├── error.log
├── package-lock.json
├── package.json
└── src/
    ├── config.js
    ├── core/
    │   ├── behaviors/
    │   │   ├── chat.js
    │   ├── behaviors.js
    │   ├── bot.js
    │   ├── states/
    │   │   └── chatState.js
    │   ├── states.js
    │   └── targets.js
    ├── index.js
    └── utils/
        ├── logger.js
        ├── openai.js
        └── queue.js
```

## Setup & Usage

1. **Clone the repository**:

    ```
    git clone https://github.com/yourusername/mineflayer-openai.git
    ```

2. **Install dependencies**:

    Navigate to the project directory and run:

    ```
    npm install
    ```

3. **Configure OpenAI API Key**:

    Create a `.env` file in the root directory and add your OpenAI API key:

    ```
    OPENAI_KEY=your_openai_key_here
    ```

4. **Configure Bot Settings**:

    Adjust the bot settings in `config.js` as per your requirements.

5. **Start the Bot**:

    Run the following command to start the bot:

    ```
    npm start
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
