// ✅ Generate a random session ID
const sessionId = "session-" + Math.random().toString(36).substring(2, 15);

// ✅ Pick a random agent name (only human names, no generic titles)
const agentNames = ["Julie", "Mark", "Emily", "David", "Samantha", "Michael", "Rachel"];
const randomAgentName = agentNames[Math.floor(Math.random() * agentNames.length)];

function addMessage(text, role) {
  let chatbox = document.getElementById("chatbox");
  if (!chatbox) {
    console.error("Chatbox not found!");
    return;
  }
  let msg = document.createElement("div");
  msg.className = `message ${role}`;
  msg.textContent = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function sendMessage() {
  let input = document.getElementById("userInput").value;
  if (input.trim() === "") return;

  addMessage(input, "user");
  document.getElementById("userInput").value = "";

  // ✅ Typing indicator (always shows agent name)
  let typingIndicator = document.createElement("div");
  typingIndicator.className = "typing";
  typingIndicator.id = "typingIndicator";
  typingIndicator.textContent = `${randomAgentName} is typing...`;
  document.getElementById("chatbox").appendChild(typingIndicator);

  try {
    let response = await fetch("https://ai-chat-backend-ygxl.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, sessionId })
    });

    let data = await response.json();

    // ✅ Remove typing indicator
    typingIndicator.remove();

    addMessage(data.reply, "ai");
  } catch (error) {
    console.error("Error:", error);
    if (document.getElementById("typingIndicator")) {
      document.getElementById("typingIndicator").remove();
    }
    addMessage("Sorry, something went wrong.", "ai");
  }
}

function handleKey(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
}

async function endChat() {
  try {
    let response = await fetch("https://ai-chat-backend-ygxl.onrender.com/end-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId })
    });

    let data = await response.json();
    addMessage(data.message, "system");

    // ✅ Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = "https://www.google.com";
    }, 2000);
  } catch (error) {
    console.error("Error ending chat:", error);
  }
}

// ✅ Auto-greeting guaranteed
window.onload = function() {
  console.log("Window loaded, adding greeting...");
  addMessage(`Hi! Thanks for contacting support. My name is ${randomAgentName}. How can I help you today?`, "ai");
};
