import {
  Button,
  FormControl,
  TextInput,
  Select,
  TextInputWithTokens,
} from "@primer/react";
import { SignOutIcon, TrashIcon } from "@primer/octicons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdditionalInfo() {
  const navigate = useNavigate();

  const levels = [
    { value: "K", label: "Kindergarten" },
    { value: "1", label: "1st Grade" },
    { value: "2", label: "2nd Grade" },
    { value: "3", label: "3rd Grade" },
    { value: "4", label: "4th Grade" },
    { value: "5", label: "5th Grade" },
    { value: "6", label: "6th Grade" },
    { value: "7", label: "7th Grade" },
    { value: "8", label: "8th Grade" },
    { value: "9", label: "9th Grade" },
    { value: "10", label: "10th Grade" },
    { value: "11", label: "11th Grade" },
    { value: "12", label: "12th Grade" },
    { value: "College", label: "College" },
  ];

  const [tokens, setTokens] = useState([]);
  const onTokenRemove = (tokenId) => {
    setTokens(tokens.filter((token) => token.id !== tokenId));
  };

  const [name, setName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [hobby, setHobby] = useState("");

  return (
    <div style={{ marginTop: "50px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Button leadingVisual={SignOutIcon}>Sign Out</Button>
        <h2 style={{ width: "400px" }}>
          To make great videos{" "}
          <span style={{ fontWeight: "900" }}>just for you</span>, we need to
          know more about you
        </h2>
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <TextInput placeholder="i.e. John Doe" width="400px" />
        </FormControl>
        <div style={{ height: "20px" }} />
        <FormControl>
          <FormControl.Label>Your Grade Level</FormControl.Label>
          <Select style={{ width: "390px" }}>
            {levels.map((level) => (
              <Select.Option key={level.value} value={level.value}>
                {level.label}
              </Select.Option>
            ))}
          </Select>
        </FormControl>
        <div style={{ height: "20px" }} />
        <FormControl>
          <FormControl.Label>Your Hobbies</FormControl.Label>
          <FormControl.Caption>
            We use this information to generate content that relates to you.
          </FormControl.Caption>
          <div
            style={{
              width: "380px",
              height: "200px",
              border: "1px #B1B1B1 solid",
              borderRadius: "10px",
              padding: "10px",
              overflowY: "scroll",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <TextInput
                width="300px"
                placeholder="i.e. Basketball"
                onChange={(event) => {
                  setHobby(event.target.value);
                }}
                value={hobby}
              />
              <Button
                onClick={() => {
                  setHobbies([...hobbies, hobby]);
                  setHobby("");
                }}
              >
                Add Hobby
              </Button>
            </div>
            {hobbies.map((hobby, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <span>{hobby}</span>
                <Button
                  leadingVisual={TrashIcon}
                  variant="danger"
                  onClick={() => {
                    setHobbies(hobbies.filter((_, i) => i !== index));
                  }}
                />
              </div>
            ))}
          </div>
        </FormControl>
        <div style={{ height: "20px" }} />
        <Button
          variant="primary"
          width="380px"
          style={{ width: "400px" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Start Learning
        </Button>
      </div>
    </div>
  );
}
