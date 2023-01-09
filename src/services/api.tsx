export interface NewEvent {
  id: string;
  calendarId: string;
  title: string;
  start: string;
  end: string;
  category: string;
  duration: string;
}

export const getEventsData = async (apiKeyReq: string, teamIdReq: string) => {
  if (apiKeyReq == "" || teamIdReq == "") {
    // navigate login
    return;
  } else {
    const res = await fetch(
      `https://cors.960.eu/api.clickup.com/api/v2/team/${teamIdReq}/time_entries`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKeyReq,
        },
        next: { revalidate: 60 },
      }
    );
    const data = await res.json();
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
      newEvents.reverse();
      return { newEvents, calendars };
    }
    return;
  }
};
