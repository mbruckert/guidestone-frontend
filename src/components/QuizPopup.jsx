import { Dialog } from "@primer/react/drafts";
import { Spinner, Button, Box, Popover } from "@primer/react";
import { InfoIcon, CheckCircleIcon } from "@primer/octicons-react";
import React from "react";
import Player from "../assets/player.png";
import { toast } from "react-hot-toast";

export default function QuizPopup({ isOpen, closePopup, node }) {
  const returnFocusRef = React.useRef(null);

  const quizQuestions = [
    {
      question: "What does d/dx mean?",
      options: ["Derivative", "Integral", "Limit", "None of the above"],
      answer: "Derivative",
    },
    {
      question: "What is a derivative?",
      options: [
        "The slope of a function",
        "The area under a curve",
        "The limit of a function",
        "None of the above",
      ],
      answer: "The slope of a function",
    },
  ];

  const missed = {
    content:
      "If you want to find the derivative of the product of two functions, you would use Product Rule. The formula for finding the product is: (fg)′=f′g+fg′",
    question: "What is the product rule?",
    options: ["f′g+fg′", "f′g-fg′", "f′g*fg′", "None of the above"],
    answer: "f′g+fg′",
  };

  return (
    <>
      <Dialog
        returnFocusRef={returnFocusRef}
        isOpen={isOpen}
        onClose={() => closePopup()}
        width="2xlarge"
        height="md"
        title={node.node_name}
      >
        <div
          style={{
            padding: "10px",
            display: "flex",
            gap: "20px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              width: "400px",
              justifyContent: "start",
              alignItems: "start",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                color: "#4F76FF",
                fontWeight: 500,
                padding: "10px",
                backgroundColor: "#ECEFFF",
                width: "fit-content",
                borderRadius: "10px",
                fontSize: "15px",
              }}
            >
              Lesson Quiz
            </h3>
            <div style={{ marginTop: "-20px" }}>
              {quizQuestions.map((question, index) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    padding: "5px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <h4>
                    {index + 1}. {question.question}
                  </h4>
                  <div style={{ marginTop: "-20px" }}>
                    {question.options.map((option, index) => (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <input type="radio" name={question.question} />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              width: "420px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              gap: "10px",
            }}
          >
            <div
              style={{
                color: "#4F76FF",
                fontWeight: 500,
                padding: "10px",
                backgroundColor: "#ECEFFF",
                width: "fit-content",
                borderRadius: "10px",
                fontSize: "15px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <span>Something you might have missed</span>
              <Box position="relative">
                <Button
                  leadingVisual={InfoIcon}
                  onClick={() =>
                    toast(
                      "We analyze how much attention you paid to each scene and analyze that to see what you might have missed to strengthen your learning!"
                    )
                  }
                >
                  What is this?
                </Button>
              </Box>
            </div>
            <p>
              If you want to find the derivative of the product of two
              functions, you would use Product Rule. The formula for finding the
              product is: (fg)′=f′g+fg′
            </p>
            <div style={{ marginTop: "-20px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "5px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              >
                <h4>
                  {quizQuestions.length - 1}. {missed.question}
                </h4>
                <div style={{ marginTop: "-20px" }}>
                  {missed.options.map((option, index) => (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <input type="radio" name={missed.question} />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="primary"
          style={{ width: "100%" }}
          leadingVisual={CheckCircleIcon}
          onClick={() => {
            closePopup();
          }}
        >
          Check Answers
        </Button>
      </Dialog>
    </>
  );
}
