import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";

interface MenuProps {
  onClick: React.Dispatch<React.SetStateAction<number>>;
  setApi: React.Dispatch<React.SetStateAction<string>>;
  setTeam: React.Dispatch<React.SetStateAction<string>>;
  apiKey: string;
  teamId: string;
}

const Settings = ({ onClick, setApi, setTeam, apiKey, teamId }: MenuProps) => {
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
    <div>
      <h1 className="py-4 text-center text-3xl text-white">Settings</h1>
      <p className="py-2 text-center">API Key</p>
      <input
        type="text"
        placeholder="API Key"
        onChange={handleChangeApi}
        value={apiKey}
        className="input w-full max-w-xs"
      />
      <p className="py-2 text-center">Team Id</p>
      <input
        type="text"
        placeholder="Team Id"
        onChange={handleChangeTeam}
        value={teamId}
        className="input w-full max-w-xs"
      />
      <div className="py-2 text-center">
        <button className="btn-primary btn" onClick={save}>
          SAVE
        </button>
      </div>
    </div>
  );
};

export default Settings;
