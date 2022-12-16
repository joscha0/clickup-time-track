import { type NextPage } from "next";
import dynamic from "next/dynamic";

import Head from "next/head";
const TimeCalendar = dynamic(() => import("../components/calendar"), {
  ssr: false,
});
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
  duration: string;
}

const Home: NextPage = () => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const [calendars, setCalendars] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  const [apiKey, setApi] = useState("");
  const [teamId, setTeam] = useState("");

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const apiKeyReq: string = localStorage.getItem("api-key") ?? "";
    const teamIdReq: string = localStorage.getItem("team-id") ?? "";
    setApi(apiKeyReq);
    setTeam(teamIdReq);
    if (apiKeyReq == "" || teamIdReq == "") {
      setIndex(2);
      setLoading(false);
    } else {
      console.log(apiKey);
      fetch(
        `https://cors.960.eu/api.clickup.com/api/v2/team/${teamIdReq}/time_entries`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: apiKeyReq,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          if (data.data !== undefined) {
            const calendars: string[] = [];
            const newEvents: NewEvent[] = [];
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
                duration: element.duration,
              });
            });
            setEvents(newEvents);
            setCalendars(calendars);
          }
          setLoading(false);
        });
    }
  }, []);

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
        {isLoading ? (
          <button className="loading btn-square btn"></button>
        ) : (
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8 ">
            {index == 0 && (
              <TimeCalendar events={events} calendars={calendars} />
            )}
            {index == 1 && <List events={events} teamId={teamId} />}
            {index == 2 && (
              <Settings
                setApi={setApi}
                setTeam={setTeam}
                apiKey={apiKey}
                teamId={teamId}
              />
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
