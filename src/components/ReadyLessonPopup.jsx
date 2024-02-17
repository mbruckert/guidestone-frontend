import { Dialog } from "@primer/react/drafts";
import { Spinner } from "@primer/react";
import React from "react";

export default function ReadyLessonPopup({
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
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex" }}>
            <video width="400" height="220" controls>
              <source src="movie.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Dialog>
    </>
  );
}
