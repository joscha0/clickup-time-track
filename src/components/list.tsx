import { Box, Link } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import type { NewEvent } from "../services/api";

interface ListProps {
  events: NewEvent[];
  teamId: string;
}

const List = ({ events, teamId }: ListProps) => {
  const columns: GridColDef[] = [
    {
      field: "calendarId",
      headerName: "Space",
      width: 150,
      renderCell: (params) => (
        <Link
          href={"https://app.clickup.com/" + teamId + "/v/l/s/" + params.value}
          target="_blank"
          rel="noreferrer"
        >
          {params.value}{" "}
        </Link>
      ),
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 150,
      valueFormatter: ({ value }) =>
        new Date(parseInt(value)).toISOString().slice(11, -5),
    },
    { field: "title", headerName: "Task", flex: 1, minWidth: 350 },
    {
      field: "start",
      headerName: "Start",
      width: 250,
      valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
    {
      field: "end",
      headerName: "End",
      width: 250,
      valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        sx={{ border: 0 }}
        rows={events}
        columns={columns}
        pageSize={50}
        components={{
          Toolbar: () => (
            <GridToolbarContainer
              sx={{
                p: 1,
                pl: { xs: 8, sm: 1 },
                justifyContent: "space-between",
              }}
            >
              <Box>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
              </Box>
              <GridToolbarQuickFilter />
            </GridToolbarContainer>
          ),
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
};

export default List;
