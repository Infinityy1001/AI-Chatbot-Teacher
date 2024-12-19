# AI Chatbot Web App

This project is a web-based chatbot application designed to answer questions related to Artificial Intelligence (AI). It uses the Hugging Face Transformers library for generating responses and leverages the WebGPU for faster processing.

## Features

- Real-time Q&A about AI concepts like Machine Learning, Neural Networks, and more.
- Interactive chat interface with user-friendly design.
- Loading spinner to indicate processing when generating responses.
- Dynamic message rendering in a conversation format.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **AI Model:** Hugging Face Transformers (`onnx-community/Llama-3.2-1B-Instruct-q4f16`)
- **Backend:** Runs entirely on the client-side using WebGPU for inference

## Requirements

- Modern browser with WebGPU support (e.g., Chrome or Edge)
- Internet connection for loading the AI model

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Infinityy1001/AI-Chatbot-Teacher
cd ai-chatbot-web
```

### File Structure

```bash
ai-chatbot-web/
├── assets/
│   └── send.svg          # Icon for the send button
├── index.html            # Main HTML file
├── style.css             # Styling for the chatbot UI
├── main.js              # JavaScript handling the chatbot logic
└── README.md             # Project documentation
```

### How It Works

1. Input Question: Users type a question in the text field and click the send button.
2. AI Model: The app uses the Hugging Face pipeline to process the question and generate a response.
3. Response Display: The AI's answer appears in the chat window in real time.

### Live Demo 

```markdown
   ## Live Demo
   [View Live Demo](https://<your-username>.github.io/ai-chatbot-web/)
```