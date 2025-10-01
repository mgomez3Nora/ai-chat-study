function sendMessage() {
  let input = document.getElementById("userInput").value;
  if (input.trim() === "") return;

  let chatbox = document.getElementById("chatbox");

  // Add user message
  let userMsg = document.createElement("div");
  userMsg.className = "user";
  userMsg.textContent = "You: " + input;
  chatbox.appendChild(userMsg);

  // Placeholder AI response (we'll connect GPT later!)
  let aiMsg = document.createElement("div");
  aiMsg.className = "ai";
  aiMsg.textContent = "AI: Thanks for sharing. I’ll look into this right away.";
  chatbox.appendChild(aiMsg);

  // Clear input
  document.getElementById("userInput").value = "";
  chatbox.scrollTop = chatbox.scrollHeight;
}
