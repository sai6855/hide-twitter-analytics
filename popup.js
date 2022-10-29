const form = document.getElementById("userform");
form.addEventListener("submit", async function(e) {
  const username = document.getElementById("username").value;
  await chrome.storage.sync.set({
    username,
  });
});
