import Welcome from "../../assets/welcome.png";
import { Button, CheckboxGroup, Checkbox, FormControl } from "@primer/react";
import { LockIcon } from "@primer/octicons-react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div>
      <img
        src={Welcome}
        style={{ width: "400px", marginTop: "120px", marginLeft: "20%" }}
      />
      <h2 style={{ marginTop: "40px", fontSize: "30px" }}>
        Welcome to <span style={{ color: "#4F76FF" }}>GuideStone</span>
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CheckboxGroup>
          <FormControl>
            <Checkbox checked={true} />
            <FormControl.Label>
              Eye Tracking to detect your attention/understanding
            </FormControl.Label>
          </FormControl>
          <FormControl>
            <Checkbox checked={true} />
            <FormControl.Label>
              Graph that populates to supplement learning
            </FormControl.Label>
          </FormControl>
          <FormControl>
            <Checkbox checked={true} />
            <FormControl.Label>
              AI-generated educational videos personalized to{" "}
              <span style={{ fontWeight: "900" }}>you</span>
            </FormControl.Label>
          </FormControl>
        </CheckboxGroup>
        <Button
          leadingVisual={LockIcon}
          style={{ marginTop: "40px" }}
          onClick={() => {
            navigate("/eye-tracking");
          }}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
