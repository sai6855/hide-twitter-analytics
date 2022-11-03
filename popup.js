const form = document.getElementById("userform");
form.addEventListener("submit", async function(e) {
  e.preventDefault();
  const { username } = await chrome.storage.sync.get("username");
  if (username) {
    chrome.storage.sync.set({ username: "" });
    checkIfUserLoggedIn();
  } else {
    const username = document.getElementById("username").value;
    try {
      await fetch(
        "https://youtube-bookmarker-starter-code.vercel.app/create-user",
        {
          method: "POST",
          body: JSON.stringify({
            username,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      chrome.storage.sync.set({
        username,
      });
      checkIfUserLoggedIn();
    } catch (error) {
      alert(
        error.message || "error occurred while creating user, please try again"
      );
    }
    checkIfUserLoggedIn();
  }
});

const checkIfUserLoggedIn = async () => {
  const { username } = await chrome.storage.sync.get("username");

  if (username) {
    document.getElementById("title").innerText = "Logout user";
    document.getElementById("username").disabled = true;
    document.getElementById("username").value = username;
    document.getElementById("submit-btn").innerText = "Logout user";
    document.getElementById("text").innerText = "fetching...";
    let text = await fetch(
      `https://youtube-bookmarker-starter-code.vercel.app/text/${username}`
    );
    text = await text.json();
    if (text) {
      document.getElementById("text").innerText =
        text.message || "No text copied";
    } else {
      document.getElementById("text").innerText = "No text copied";
    }
  } else {
    document.getElementById("text").innerText = "No text copied";
    document.getElementById("username").disabled = false;
    document.getElementById("username").value = "";
    document.getElementById("title").innerText = "Register user";
    document.getElementById("submit-btn").innerText = "Submit";
  }
};

document.getElementById("copy-btn").addEventListener("click", async function() {
  navigator.clipboard.writeText(document.getElementById("text").innerText);
});

checkIfUserLoggedIn();
