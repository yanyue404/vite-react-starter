import { useOnlineStatus } from "@/hook/useOnlineStatus.js";

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h6>{isOnline ? "✅ Online" : "❌ Disconnected"}</h6>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log("✅ Progress saved");
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? "Save progress" : "Reconnecting..."}
    </button>
  );
}

export default function Network() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}
