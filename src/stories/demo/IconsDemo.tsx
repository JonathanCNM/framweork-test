import { useState } from "react";
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
  EditIcon,
  HeartIcon,
  HeartOutlineIcon,
  CashSpecialIcon,
  EditPencilIcon,
  UserCheckIcon,
  UserPlusIcon,
  WarningIcon,
  UsaIcon,
  SpainIcon,
  MexicoIcon,
  UsersIcon,
  SupportIcon,
  ExchangeIcon,
  WalletIcon,
  KapitalRIcon,
  KapitalIcon,
  AddCardV2Icon,
  BackArrowV2Icon,
  BankV2Icon,
  ExchangeV2Icon,
  SupportV2Icon,
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
  {
    label: "HeartIcon",
    Icon: HeartIcon,
  },
  {
    label: "HeartOutlineIcon",
    Icon: HeartOutlineIcon,
  },
  {
    label: "CashSpecialIcon",
    Icon: CashSpecialIcon,
  },
  {
    label: "EditPencilIcon",
    Icon: EditPencilIcon,
  },
  {
    label: "UserCheckIcon",
    Icon: UserCheckIcon,
  },
  {
    label: "UserPlusIcon",
    Icon: UserPlusIcon,
  },
  {
    label: "WarningIcon",
    Icon: WarningIcon,
  },
  {
    label: "UsaIcon",
    Icon: UsaIcon,
  },
  {
    label: "SpainIcon",
    Icon: SpainIcon,
  },
  {
    label: "MexicoIcon",
    Icon: MexicoIcon,
  },
  {
    label: "UsersIcon",
    Icon: UsersIcon,
  },
  {
    label: "SupportIcon",
    Icon: SupportIcon,
  },
  {
    label: "ExchangeIcon",
    Icon: ExchangeIcon,
  },
  {
    label: "WalletIcon",
    Icon: WalletIcon,
  },
  {
    label: "KapitalRIcon",
    Icon: KapitalRIcon,
  },
  {
    label: "KapitalIcon",
    Icon: KapitalIcon,
  },
  {
    label: "AddCardV2Icon",
    Icon: AddCardV2Icon,
  },
  {
    label: "BackArrowV2Icon",
    Icon: BackArrowV2Icon,
  },
  {
    label: "BankV2Icon",
    Icon: BankV2Icon,
  },
  {
    label: "ExchangeV2Icon",
    Icon: ExchangeV2Icon,
  },
  {
    label: "SupportV2Icon",
    Icon: SupportV2Icon,
  },
];

export const IconsDemo = () => {
  const { gradient } = useGradient();
  const [copied, setCopied] = useState("");
  const colors = getSplittedColors(gradient);

  const handleCopy = async (label: string) => {
    try {
      await navigator.clipboard.writeText(`<${label} />`);
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      console.error("No copy");
    }
  };

  return (
    <section className="icons-storybook-demo">
      <section className="icons-stoybook-demo-container">
        {iconList.map(({ label, Icon }, index) => (
          <section
            key={index}
            className="icons-storybook-demo-slot"
            onClick={() => handleCopy(label)}
            style={
              { "--bg": gradient } as React.CSSProperties & {
                [key: string]: string;
              }
            }
          >
            {copied === label ? (
              <p>Icon copied</p>
            ) : (
              <>
                <Icon size={30} colors={colors} />
                <GradientText
                  as="p"
                  textColor={gradient}
                >{`<${label} />`}</GradientText>
              </>
            )}
          </section>
        ))}
      </section>
    </section>
  );
};
