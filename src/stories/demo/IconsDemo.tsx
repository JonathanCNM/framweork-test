import { GradientText } from "../../components";
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
  HomeAddressIcon,
  WhatsAppIcon,
  UploadIcon,
  CreditCardIcon,
  DebitCardIcon,
  BankIcon,
  CashIcon,
  ErrorUserIcon,
  RoundedCheckIcon,
  UserInfoIcon,
  EditIcon
} from "../../icons";
import "../../index.css";
import { useGradient } from "../../store/useGradient";
import { getSplittedColors } from "../../utils/utils";

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
  {
    label: "HomeAddressIcon",
    Icon: HomeAddressIcon,
  },
  {
    label: "WhatsAppIcon",
    Icon: WhatsAppIcon,
  },
  {
    label: "UploadIcon",
    Icon: UploadIcon,
  },
  {
    label: "CreditCardIcon",
    Icon: CreditCardIcon,
  },
  {
    label: "DebitCardIcon",
    Icon: DebitCardIcon,
  },
  {
    label: "BankIcon",
    Icon: BankIcon,
  },
  {
    label: "CashIcon",
    Icon: CashIcon,
  },
  {
    label: "ErrorUserIcon",
    Icon: ErrorUserIcon,
  },
  {
    label: "RoundedCheckIcon",
    Icon: RoundedCheckIcon,
  },
  {
    label: "UserInfoIcon",
    Icon: UserInfoIcon,
  },
  {
    label: "EditIcon",
    Icon: EditIcon,
  },
];

export const IconsDemo = () => {
  const { gradient } = useGradient();
  const colors = getSplittedColors(gradient);

  return (
    <section className="icons-storybook-demo">
      <section className="icons-stoybook-demo-container">
        {iconList.map(({ label, Icon }, index) => (
          <section
            key={index}
            className="icons-storybook-demo-slot"
            style={
              { "--bg": gradient } as React.CSSProperties & {
                [key: string]: string;
              }
            }
          >
            <Icon size={30} colors={colors} />
            <GradientText
              as="p"
              textColor={gradient}
            >{`<${label} />`}</GradientText>
          </section>
        ))}
      </section>
    </section>
  );
};
