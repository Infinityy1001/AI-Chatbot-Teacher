import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.1.2';

console.log("Loading model...");

let device = 'webgpu';
if (!navigator.gpu) {
  console.warn("WebGPU not supported. Falling back to CPU.");
  device = 'cpu'; // Utilisation du processeur comme fallback
}

const generator = await pipeline('text-generation', 'onnx-community/Llama-3.2-1B-Instruct-q4f16', {
  device: device,
});
console.log("Model loaded");
// Élément DOM
const chatWindow = document.getElementById("chat-window");
const questionInput = document.getElementById("user-input");
const loader = document.getElementById("loader");

// Fonction pour ajouter un message au chat
function addMessageToChat(type, text) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', type);
  messageElement.textContent = text;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
}


function addLoadingSpinner() {
  const chatWindow = document.getElementById('chat-window');
  const spinner = document.createElement('div');
  spinner.classList.add('loading-spinner');
  chatWindow.appendChild(spinner);
  chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
  return spinner;
}

function removeLoadingSpinner(spinner) {
  spinner.remove();
}

// Fonction principale
async function handleQuestion() {
  const question = questionInput.value.trim();

  if (question === "") {
    alert("Please type a question!");
    return;
  }

  // Ajouter le message utilisateur
  addMessageToChat("user", question);
  questionInput.value = "";

  // Ajouter une roue de chargement
  const spinner = document.createElement('div');
  spinner.classList.add('loading-spinner');
  chatWindow.appendChild(spinner);

  try {
    const context = `
  Artificial intelligence (AI) is a field of computer science focused on creating systems capable of performing tasks that typically require human intelligence.
  Key concepts include:
  - **Machine Learning (ML)**: Algorithms that allow computers to learn from data and improve performance over time.
  - **Neural Networks**: Structures inspired by the human brain, widely used in tasks like image and speech recognition.
  - **Deep Learning**: A subset of ML involving neural networks with many layers, enabling complex pattern recognition.
  - **Computer Vision (CV)**: AI's ability to interpret and make decisions based on visual data, such as images or videos.
  - **Reinforcement Learning**: A method where agents learn by interacting with their environment to maximize a reward.
  - **Natural Language Processing (NLP)**: Techniques for understanding and generating human language.
  - **Ethical AI**: Ensuring AI systems are designed responsibly, addressing bias, transparency, and fairness.
  `;
    const output = await generator(`${context}\nQuestion: ${question}\nAnswer:`, { max_new_tokens: 150 });
    const answer = output[0].generated_text
      .split("Answer:")[1]?.trim()
      .split("\n")[0]?.trim();

    // Ajouter la réponse IA
    addMessageToChat("ai", answer || "I couldn't generate a proper response, sorry!");
  } catch (error) {
    addMessageToChat("ai", "An error occurred while generating a response.");
    console.error(error);
  } finally {
    spinner.remove(); // Supprimer la roue de chargement
  }
}

// Gestion du formulaire
document.getElementById("chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  handleQuestion();
});

