/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2022 Ben Siebert. All rights reserved.
 */

console.log("%cInCode Analytics", "color: #00ADFF; font-size: 2rem;");
console.log("%cSending Payload to /api/v1/analytics...", "color: #FEE75C;");

fetch("/api/v1/analytics", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: localStorage.getItem("accessName") || "incode-user",
    userAgent: navigator.userAgent,
    url: window.location.href,
    referrer: document.referrer || "https://incode-url.com",
    language: navigator.language,
  }),
})
  .then((res) => {
    res
      .json()
      .then((data) => {
        if (!data.error) {
          console.log("%cPayload send successfully!", "color: #57F287;");
          console.log("Response: " + JSON.stringify(data));
        } else {
          console.log("%cPayload could not be sent!", "color: #ED4245;");
          console.log("Error: " + JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.log("%cPayload could not be sent!", "color: #ED4245;");
        console.log("Error: " + JSON.stringify(err));
      });
  })
  .catch((err) => {
    console.log("%cPayload could not be sent!", "color: #ED4245;");
    console.log("Error: " + JSON.stringify(err));
  });
