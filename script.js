async function sendMessage() {
  let input = document.getElementById("userInput").value;
  if (input.trim() === "") return;

  let chatbox = document.getElementById("chatbox");

  // Add user message
  let userMsg = document.createElement("div");
  userMsg.className = "user";
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
      body: JSON.stringify({ message: input })
    });

    let data = await response.json();

    // Add AI message
    let aiMsg = document.createElement("div");
    aiMsg.className = "ai";
    aiMsg.textContent = "AI: " + data.reply;
    chatbox.appendChild(aiMsg);

    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (error) {
    console.error("Error:", error);
    let errorMsg = document.createElement("div");
    errorMsg.className = "ai";
    errorMsg.textContent = "AI: Sorry, something went wrong.";
    chatbox.appendChild(errorMsg);
  }
}
