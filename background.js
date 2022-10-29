// // // chrome.tabs.onUpdated.addListener((tabId, tab) => {
// // //   console.log(tab.url);
// // //   if (tab.url && tab.url.includes("youtube.com/watch")) {
// // //     const queryParameters = tab.url.split("?")[1];
// // //     const urlParameters = new URLSearchParams(queryParameters);
// // //     console.log("url parameters: " + urlParameters);
// // //     chrome.tabs.sendMessage(tabId, {
// // //       type: "NEW",
// // //       videoId: urlParameters.get("v"),
// // //     });
// // //   }
// // // });

// // function onClickHandler(info, tab) {
// //   if (info.menuItemId == "radio1" || info.menuItemId == "radio2") {
// //     console.log(
// //       "radio item " +
// //         info.menuItemId +
// //         " was clicked (previous checked state was " +
// //         info.wasChecked +
// //         ")"
// //     );
// //   } else if (info.menuItemId == "checkbox1" || info.menuItemId == "checkbox2") {
// //     console.log(JSON.stringify(info));
// //     console.log(
// //       "checkbox item " +
// //         info.menuItemId +
// //         " was clicked, state is now: " +
// //         info.checked +
// //         " (previous state was " +
// //         info.wasChecked +
// //         ")"
// //     );
// //   } else {
// //     console.log("item " + info.menuItemId + " was clicked");
// //     console.log("info: " + JSON.stringify(info));
// //     console.log("tab: " + JSON.stringify(tab));
// //   }
// // }

// function ensureSendMessage(tabId, message, callback) {
//   chrome.tabs.sendMessage(tabId, message, function(response) {
//     if (response && response.pong) {
//       // Content script ready
//       chrome.tabs.sendMessage(tabId, message, callback);
//     } else {
//       // No listener on the other end
//       console.log("Injecting script programmatically");
//       chrome.scripting.executeScript(
//         { target: { tabId: tabId }, files: ["contentScript.js"] },
//         function() {
//           if (chrome.runtime.lastError) {
//             console.error(chrome.runtime.lastError);
//             throw Error("Unable to inject script into tab " + tabId);
//           }
//           // OK, now it's injected and ready
//           console.log("Sending msg now");
//           chrome.tabs.sendMessage(tabId, message, callback);
//         }
//       );
//     }
//   });
// }

// chrome.contextMenus.onClicked.addListener(function(info, tab) {
//   ensureSendMessage(tab.id, info);
// });
// chrome.runtime.onInstalled.addListener(function() {
//   chrome.contextMenus.create({
//     title: "Copy to copy-anywhere-paste-anywhere",
//     id: "copy",
//   });
// });

// // const onClickHandler = (option) => {
// //   console.log("onClick: " + JSON.stringify(option));
// // };
// // chrome.contextMenus.onClicked.addListener(onClickHandler);
// // chrome.runtime.onInstalled.addListener(function() {
// //   chrome.contextMenus.create({ title: "copy", id: "copy" });
// //   chrome.contextMenus.create({ title: "paste", id: "paste" });
// // });
// // // Set up context menu tree at install time.
// // chrome.runtime.onInstalled.addListener(function() {
// //   // Create one test item for each context type.
// //   var contexts = [
// //     "page",
// //     "selection",
// //     "link",
// //     "editable",
// //     "image",
// //     "video",
// //     "audio",
// //   ];
// //   for (var i = 0; i < contexts.length; i++) {
// //     var context = contexts[i];
// //     var title = "Test '" + context + "' menu item";
// //     var id = chrome.contextMenus.create({
// //       title: title,
// //       contexts: [context],
// //       id: "context" + context,
// //     });
// //     console.log("'" + context + "' item:" + id);
// //   }

// //   // Create a parent item and two children.
// //   chrome.contextMenus.create({ title: "Test parent item", id: "parent" });
// //   chrome.contextMenus.create({
// //     title: "Child 1",
// //     parentId: "parent",
// //     id: "child1",
// //   });
// //   chrome.contextMenus.create({
// //     title: "Child 2",
// //     parentId: "parent",
// //     id: "child2",
// //   });
// //   console.log("parent child1 child2");

// //   // Create some radio items.
// //   chrome.contextMenus.create({ title: "Radio 1", type: "radio", id: "radio1" });
// //   chrome.contextMenus.create({ title: "Radio 2", type: "radio", id: "radio2" });
// //   console.log("radio1 radio2");

// //   // Create some checkbox items.
// //   chrome.contextMenus.create({
// //     title: "Checkbox1",
// //     type: "checkbox",
// //     id: "checkbox1",
// //   });
// //   chrome.contextMenus.create({
// //     title: "Checkbox2",
// //     type: "checkbox",
// //     id: "checkbox2",
// //   });
// //   console.log("checkbox1 checkbox2");

// //   // Intentionally create an invalid item, to show off error checking in the
// //   // create callback.
// //   console.log(
// //     "About to try creating an invalid item - an error about " +
// //       "duplicate item child1 should show up"
// //   );
// //   chrome.contextMenus.create({ title: "Oops", id: "child1" }, function() {
// //     if (chrome.extension.lastError) {
// //       console.log("Got expected error: " + chrome.extension.lastError.message);
// //     }
// //   });
// // });
