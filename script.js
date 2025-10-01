// Generate a random session ID for transcripts
const sessionId = "session-" + Math.random().toString(36).substring(2, 15);

async function sendMessage() {
  let input = document.getElementById("userInput").value;
  if (input.trim() === "") return; // safeguard

  let chatbox = document.getElementById("chatbox");

  // Add user message
  let userMsg = document.createElement("div");
  userMsg.className = "user message";
  userMsg.textContent = "You: " + input;
  chatbox.appendChild(userMsg);

  // Clear input field
  document.getElementById("userInput").value = "";
  chatbox.scrollTop = chatbox.scrollHeight;

  try {
    // Send message to your Render backend
    let response = await fetch("https://ai-chat-backend-ygxl.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, sessionId })
    });

    let data = await response.json();

    // Add AI message
    let aiMsg = document.createElement("div");
    aiMsg.className = "ai message";
    aiMsg.textContent = "AI: " + data.reply;
    chatbox.appendChild(aiMsg);

    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (error) {
    console.error("Error:", error);
    let errorMsg = document.createElement("div");
    errorMsg.className = "ai message";
    errorMsg.textContent = "AI: Sorry, something went wrong.";
    chatbox.appendChild(errorMsg);
  }
}

// Handle Enter key
function handleKey(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // don’t insert newline
    let input = document.getElementById("userInput").value.trim();
    if (input !== "") {
      sendMessage();
    }
  }
}

// End chat and save transcript
async function endChat() {
  try {
    let response = await fetch("https://ai-chat-backend-ygxl.onrender.com/end-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId })
    });

    let data = await response.json();

    let chatbox = document.getElementById("chatbox");
    let endMsg = document.createElement("div");
    endMsg.className = "system message";
    endMsg.textContent = "System: " + data.message;
    chatbox.appendChild(endMsg);

    chatbox.scrollTop = chatbox.scrollHeight;

    // ✅ Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = "https://www.google.com";
    }, 2000);

  } catch (error) {
    console.error("Error ending chat:", error);
  }
}

// Auto-greeting when page loads
window.onload = function() {
  let chatbox = document.getElementById("chatbox");
  let aiMsg = document.createElement("div");
  aiMsg.className = "ai message";
  aiMsg.textContent = "AI: Hi! Thanks for contacting support. How can I help you today?";
  chatbox.appendChild(aiMsg);
};
