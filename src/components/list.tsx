import { useMemo, useState } from "react";

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
  teamId: string;
}

const PageSize = 10;

const List = ({ events, teamId }: ListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return events.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

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
              currentTableData.map((event, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <a
                        className="link"
                        href={
                          "https://app.clickup.com/" +
                          teamId +
                          "/v/l/s/" +
                          event.calendarId
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {event.calendarId}
                      </a>
                    </td>
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
        <div className="btn-group">
          <button
            className="btn"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            «
          </button>
          <button className="btn">{currentPage}</button>
          <button
            className="btn"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
