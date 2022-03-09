/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { useEffect } from "react";

export default function WebStatistics() {
  const [timeRange, setTimeRange] = React.useState(-1);
  const [data, setData] = React.useState<
    {
      username: string;
      userAgent: string;
      url: string;
      referrer: string;
      language: string;
    }[]
  >([]);

  useEffect(() => {
    fetch("/api/v1/analytics/download", {
      method: "GET",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setData(data.message);
        });
      }
    });
  }, []);

  return (
    <>
      {data.map((item) => {
        return (
          <div>
            <p>{item.username}</p>
            <p>{item.userAgent}</p>
            <p>{item.url}</p>
            <p>{item.referrer}</p>
            <p>{item.language}</p>
          </div>
        );
      })}
    </>
  );
}
