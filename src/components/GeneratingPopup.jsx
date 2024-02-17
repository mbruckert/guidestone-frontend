import { Dialog } from "@primer/react/drafts";
import { Spinner } from "@primer/react";
import React from "react";

export default function GeneratingPopup({
  isOpen,
  closePopup,
  title,
  subtitle,
}) {
  const returnFocusRef = React.useRef(null);
  return (
    <>
      <Dialog
        returnFocusRef={returnFocusRef}
        isOpen={isOpen}
        onClose={() => closePopup()}
        width="2xlarge"
        height="md"
        title={title}
        subtitle={subtitle}
      >
        <div
          style={{
            dislay: "flex",
            flexDirection: "row",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Spinner size="small" />
          <span style={{ paddingLeft: "20px" }}>
            This lesson is currently being generated just for you!
          </span>
        </div>
      </Dialog>
    </>
  );
}
