import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.assign("https://incodelang.de");
  });
  return <div>Redirecting...</div>;
}
