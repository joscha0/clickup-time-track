interface NewEvent {
  id: string;
  calendarId: string;
  title: string;
  start: string;
  end: string;
  category: string;
  duration: string;
}

interface ListProps {
  events: NewEvent[];
}

const List = ({ events }: ListProps) => {
  return (
    <div>
      <h1 className="py-4 text-center text-3xl text-white">List</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Space</th>
              <th>Task</th>
              <th>Start</th>
              <th>End</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 &&
              events.map((event, index) => {
                return (
                  <tr>
                    <td>{event.calendarId}</td>
                    <td>{event.title}</td>
                    <td>{new Date(event.start).toLocaleString()}</td>
                    <td>{new Date(event.end).toLocaleString()}</td>
                    <td>
                      {new Date(parseInt(event.duration))
                        .toISOString()
                        .slice(11, -5)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
