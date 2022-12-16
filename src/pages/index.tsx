import { type NextPage } from "next";
import dynamic from "next/dynamic";

import Head from "next/head";
import Link from "next/link";
const TimeCalendar = dynamic(() => import("../components/calendar"), {
  ssr: false,
});
// import TimeCalendar from "../components/calendar";
import { useState, useEffect } from "react";
import List from "../components/list";
import Menu from "../components/menu";
import Settings from "../components/settings";

interface NewEvent {
  id: string;
  calendarId: string;
  title: string;
  start: string;
  end: string;
  category: string;
}

const Home: NextPage = () => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const [calendars, setCalendars] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  const [isLoading, setLoading] = useState(false);

  const teamId = "30380538";

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://cors.960.eu/api.clickup.com/api/v2/team/${teamId}/time_entries`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "pk_48563893_3QW1Q2AITF3YLDKHW61MPDOQPBH9YLGU",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data)
        let calendars: string[] = [];
        let newEvents: NewEvent[] = [];
        data.data.forEach((element: any) => {
          if (!calendars.includes(element.task_location.space_id)) {
            calendars.push(element.task_location.space_id);
          }
          newEvents.push({
            id: element.id,
            calendarId: element.task_location.space_id,
            title: element.task.name,
            start: new Date(parseInt(element.start)).toISOString(),
            end: new Date(parseInt(element.end)).toISOString(),
            category: "time",
          });
        });
        setEvents(newEvents);
        setCalendars(calendars);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>ClickUp Time Track</title>
        <meta name="description" content="ClickUp Time Tracking Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        data-theme="business"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#02276D] to-[#151A2C]"
      >
        <Menu onClick={setIndex} />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8 ">
          {index == 0 && <TimeCalendar events={events} calendars={calendars} />}
          {index == 1 && <List />}
          {index == 2 && <Settings />}
        </div>
      </main>
    </>
  );
};

export default Home;
