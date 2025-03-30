import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "../Button/ButtonCustom.jsx";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

function MeetingInfo() {
  const params = useSearchParams()[0];
  const id = params.get("id");

  return (
    <div className="text-sm flex flex-col gap-2 py-8">
      <p className="font-bold">Meeting id</p>
      <div className="flex flex-col">
        <p className="text-gray-700">{id}</p>
        <Button
          backgroundColor={"transparent"}
          style={{
            color: "#2E5DD5",
            padding: "0.5rem",
            width: "fit-content",
            display: "flex",
            justifyContent: "center",
            itemsCenter: "center",
            gap: "0.25rem",
            marginLeft: "-0.25rem",
          }}
          onClick={() => {
            try {
              navigator.clipboard.writeText(id);
              toast.success("Copied to clipboard");
            } catch {
              toast.error("Unable to copy");
            }
          }}
        >
          <ContentCopyIcon style={{ width: "1.2rem" }} />
          <span className="font-bold lowercase">Copy Meeting id</span>
        </Button>
      </div>
      <hr className="text-gray-400 mt-4" />
    </div>
  );
}

export default MeetingInfo;
