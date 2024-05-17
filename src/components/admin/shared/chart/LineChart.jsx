"use client";
import React from "react";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export default function LineChart({ users, posts }) {
   //count the number of users that registered day

   const postCountsByDate = posts?.reduce((counts, post) => {
      // Convert the createdAt timestamp to a date string (YYYY-MM-DD)
      const date = new Date(post.createdAt).toISOString().split("T")[0];

      // If this date is not yet in the counts object, add it with a count of 1
      // Otherwise, increment the count for this date
      counts[date] = (counts[date] || 0) + 1;

      return counts;
   }, {});
   // count the number of posts that created day

   let postCountsArray = Object.entries(postCountsByDate).map(
      ([date, count]) => ({
         date,
         count,
      })
   );

   postCountsArray = postCountsArray.reverse();

   ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
   );

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: "top",
         },
      },
   };

   const labels = postCountsArray.map((post) => {
      const date = new Date(post.date);
      return date.toLocaleDateString("en-US", {
         month: "short",
         day: "numeric",
      });
   });

   const data = {
      labels,
      datasets: [
         {
            label: "Posts",
            data: postCountsArray.map((post) => post.count),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
         },
      ],
   };

   return <Line options={options} data={data} />;

   return <></>;
}
