/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

// Dev Note #2 (25.12.2021):
//
// This service worker handles Push Notifications! Do NEVER edit this file again!
// YOU WILL BREAK EVERYTHING CORRESPONDING TO THE PUSH NOTIFICATIONS!
//

self.addEventListener("push", function (e) {
  var options = {
    body: e.data.text(),
    icon: "images/example.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
    actions: [
      {
        action: "explore",
        title: "Explore this new world",
        icon: "images/checkmark.png",
      },
      { action: "close", title: "Close", icon: "images/xmark.png" },
    ],
  };
  e.waitUntil(
    self.registration.showNotification("Mitteilung von InCode!", options)
  );
});
