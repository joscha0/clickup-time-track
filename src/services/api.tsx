export interface NewEvent {
  id: string;
  calendarId: string;
  title: string;
  start: string;
  end: string;
  category: string;
  duration: string;
}

export interface ApiElement {
  id: string;
  task: ApiTask;
  wid: string;
  user: ApiUser;
  billable: boolean;
  start: string;
  end: string;
  duration: string;
  description: string;
  tags: any[];
  source: string;
  at: string;
  task_location: ApiTaskLocation;
  task_tags: ApiTaskTag[];
  task_url: string;
}

export interface ApiTask {
  id: string;
  custom_id: string;
  name: string;
  status: ApiStatus;
  custom_type: null;
}

export interface ApiStatus {
  status: string;
  color: string;
  type: string;
  orderindex: number;
}

export interface ApiTaskLocation {
  list_id: string;
  folder_id: string;
  space_id: string;
  list_name: string;
  folder_name: string;
  space_name: string;
}

export interface ApiTaskTag {
  name: string;
  tag_fg: string;
  tag_bg: string;
  creator: number;
}

export interface ApiUser {
  id: number;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture: string;
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
      data.data.forEach((element: ApiElement) => {
        try {
          if (!calendars.includes(element.task_location.space_id)) {
            calendars.push(element.task_location.space_id);
          }
          newEvents.push({
            id: element.id,
            calendarId:
              element.task_location === undefined
                ? ""
                : element.task_location.space_id,
            title: element.task === undefined ? "" : element.task.name,
            start: new Date(parseInt(element.start)).toISOString(),
            end: new Date(parseInt(element.end)).toISOString(),
            category: "time",
            duration: element.duration,
          });
        } catch (error) {
          console.error(error);
        }
      });
      newEvents.reverse();
      return { newEvents, calendars };
    }
    return;
  }
};
