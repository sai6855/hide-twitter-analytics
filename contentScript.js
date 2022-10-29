const trackKeys = {};

document.addEventListener("keydown", async (e) => {
  if (trackKeys["c"] && trackKeys["i"] && trackKeys["control"]) {
    trackKeys["c"] = false;
    trackKeys["i"] = false;
    trackKeys["control"] = false;
  }

  if (["c", "i", "control"].includes(e.key.toLowerCase())) {
    trackKeys[e.key.toLowerCase()] = true;

    if (trackKeys["c"] && trackKeys["i"] && trackKeys["control"]) {
      try {
        const { username } = await chrome.storage.sync.get("username");
        const apiData = await fetch(
          "https://youtube-bookmarker-starter-code.vercel.app/text",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              text: window.getSelection().toString(),
            }),
          }
        );

        const data = await apiData.json();
        if (apiData.status === 404 && data.message) {
          alert(data.message);
        }
      } catch (error) {
        console.log(error);
        alert(JSON.stringify(error));
      }
    }
  }
});

document.addEventListener(
  "keyup",
  (e) => (trackKeys[e.key.toLowerCase()] = false)
);

// const observer = new IntersectionObserver((entries) => {
//   if (entries[0].isIntersecting) {
//     // alert("0");
//     const isButtonExists = document.getElementById("copy-btn");
//     if (!isButtonExists) {
//       const navbar = document.body;
//       const button = document.createElement("button");
//       button.id = "copy-btn";
//       button.style.background = "#1DA1F2";
//       button.style.border = "none";
//       button.style.color = "white";
//       button.style.borderRadius = "4px";
//       button.style.padding = "4px";
//       button.style.position = "fixed";
//       button.style.top = "0px";
//       button.style.left = "0px";
//       button.innerHTML = "copy";
//       button.style.zIndex = 99999;
//       button.addEventListener("click", copy);
//       navbar.append(button);
//     }
//   }
// });

// //chrome.contextMenus.create({ title: "Test parent item", id: "parent" });

// const copy = () => {
//   fetch("https://jsonplaceholder.typicode.com/todos/1")
//     .then((response) => response.json())
//     .then((json) => alert(JSON.stringify(json)));
// };
// observer.observe(document.body);

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   const { menuItemId } = request;
//   if (menuItemId === "copy") {
//     // alert(window.getSelection().toString());
//   }
//   console.log("Text toggled bold");
// });

// alert(Object.keys(chrome.runtime));

// (() => {
//   const navbar = document.getElementById("container");
//   const button = document.createElement("button");
//   button.setAttribute("innerHTML", "hello");
//   navbar.appendChild(button);
// })();
// (() => {
//   let youtubeLeftControls, youtubePlayer;
//   let currentVideo = "";
//   let currentVideoBookmarks = [];

//   //   chrome.runtime.onMessage.addListener((obj, sender, response) => {
//   //     const { type, value, videoId } = obj;

//   //     if (type === "NEW") {
//   //       console.log(type);
//   //       currentVideo = videoId;
//   //       newVideoLoaded();
//   //     }
//   //   });

//   const newVideoLoaded = () => {
//     const bookmarkBtnExists = document.getElementById("copy-btn");

//     if (!bookmarkBtnExists) {
//       const navbar = document.getElementById("start");

//       const button = document.createElement("button");
//       button.id = "copy-btn";
//       button.style.background = "red";
//       //   button.style.position = "absolute";
//       //   button.style.top = "0px";
//       //   button.style.left = "0px";
//       button.innerHTML = "copy";

//       navbar.append(button);

//       const bookmarkBtn = document.createElement("img");

//       bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
//       bookmarkBtn.className = "ytp-button " + "bookmark-btn";
//       bookmarkBtn.title = "Click to bookmark current timestamp";

//       //   document.getElementsByTagName("div")[0].append(button);
//       //   alert(document.getElementsByTagName("div").length);

//       youtubeLeftControls = document.getElementsByClassName(
//         "ytp-right-controls"
//       )[0];
//       youtubePlayer = document.getElementsByClassName("video-stream")[0];

//       youtubeLeftControls.append(button);
//       button.addEventListener("click", addNewBookmarkEventHandler);
//     }
//   };

//   const addNewBookmarkEventHandler = () => {
//     alert(window.getSelection().toString() || "No text selected");
//     const currentTime = youtubePlayer.currentTime;
//     const newBookmark = {
//       time: currentTime,
//       desc: "Bookmark at " + getTime(currentTime),
//     };
//     console.log(newBookmark);

//     chrome.storage.sync.set({
//       [currentVideo]: JSON.stringify(
//         [...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time)
//       ),
//     });
//   };

//   document.addEventListener("load", newVideoLoaded);

//   //newVideoLoaded();
// })();

// const getTime = (t) => {
//   var date = new Date(0);
//   date.setSeconds(1);

//   return date.toISOString().substr(11, 0);
// };
