import { useState } from "react";
import {
  CameraGradient,
  UploadCloud,
  BackArrow,
  Close,
  RightArrow,
  FaceIcon,
  RightIcon,
  ErrorIcon,
  CameraErrorIcon,
  IproovCameraErrorIcon,
  IconApp,
  LolaLogo,
  SuccessIcon,
  CardIcon,
  AddCardIcon,
  RightRoundedIcon,
} from "../../assets";
import "../../index.css";

const iconList = [
  {
    label: "CameraGradient",
    Icon: CameraGradient,
  },
  {
    label: "UploadCloud",
    Icon: UploadCloud,
  },
  {
    label: "BackArrow",
    Icon: BackArrow,
  },
  {
    label: "Close",
    Icon: Close,
  },
  {
    label: "RightArrow",
    Icon: RightArrow,
  },
  {
    label: "FaceIcon",
    Icon: FaceIcon,
  },
  {
    label: "RightIcon",
    Icon: RightIcon,
  },
  {
    label: "ErrorIcon",
    Icon: ErrorIcon,
  },
  {
    label: "CameraErrorIcon",
    Icon: CameraErrorIcon,
  },
  {
    label: "IproovCameraErrorIcon",
    Icon: IproovCameraErrorIcon,
  },
  {
    label: "IconApp",
    Icon: IconApp,
  },
  {
    label: "LolaLogo",
    Icon: LolaLogo,
  },
  {
    label: "SuccessIcon",
    Icon: SuccessIcon,
  },
  {
    label: "CardIcon",
    Icon: CardIcon,
  },
  {
    label: "AddCardIcon",
    Icon: AddCardIcon,
  },
  {
    label: "RightRoundedIcon",
    Icon: RightRoundedIcon,
  },
];

export const IconsDemo = () => {
  const [color1, setColor1] = useState("#000");
  const [color2, setColor2] = useState("#000");

  return (
    <section className="icons-storybook-demo">
      <p>Selecciona los colores</p>
      <section className="icons-storybook-demo--field-container">
        <section className="icons-storybook-demo--field">
          <label htmlFor="color1">Color 1</label>
          <p>{color1}</p>
          <input
            id="color1"
            value={color1}
            type="color"
            onChange={(event) => setColor1(event.target.value)}
            placeholder="Color 1"
          />
        </section>
        <section className="icons-storybook-demo--field">
          <label htmlFor="color2">Color 2</label>
          <p>{color2}</p>
          <input
            id="color2"
            value={color2}
            type="color"
            onChange={(event) => setColor2(event.target.value)}
            placeholder="Color 2"
          />
        </section>
      </section>
      <section className="icons-stoybook-demo-container">
        {iconList.map(({ label, Icon }, index) => (
          <section key={index} className="icons-storybook-demo-slot">
            <Icon size={30} colors={[color1, color2]} />
            <p>{`<${label} />`}</p>
          </section>
        ))}
      </section>
    </section>
  );
};
