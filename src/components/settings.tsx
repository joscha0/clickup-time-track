import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { SetStateAction } from "react";

interface MenuProps {
  setApi: React.Dispatch<React.SetStateAction<string>>;
  setTeam: React.Dispatch<React.SetStateAction<string>>;
  apiKey: string;
  teamId: string;
}

const Settings = ({ setApi, setTeam, apiKey, teamId }: MenuProps) => {
  const router = useRouter();

  const handleChangeApi = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setApi(event.target.value);
  };
  const handleChangeTeam = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTeam(event.target.value);
  };

  const save = () => {
    localStorage.setItem("api-key", apiKey);
    localStorage.setItem("team-id", teamId);
    router.reload();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h3">Settings</Typography>

      <TextField
        id="outlined-apikey"
        label="API Key"
        variant="outlined"
        type="text"
        placeholder="pk_123456"
        onChange={handleChangeApi}
        value={apiKey}
      />
      <TextField
        id="outlined-teamid"
        label="Team Id"
        variant="outlined"
        type="text"
        placeholder="123456"
        onChange={handleChangeTeam}
        value={teamId}
      />
      <Box>
        <Button variant="contained" onClick={save}>
          SAVE
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
