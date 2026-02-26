import { useId, type SVGProps } from "react";

export const CameraGradient: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 60, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M208 56h-27.72l-13.63-20.44A8 8 0 0 0 160 32H96a8 8 0 0 0-6.65 3.56L75.71 56H48a24 24 0 0 0-24 24v112a24 24 0 0 0 24 24h160a24 24 0 0 0 24-24V80a24 24 0 0 0-24-24m8 136a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V80a8 8 0 0 1 8-8h32a8 8 0 0 0 6.66-3.56L100.28 48h55.43l13.63 20.44A8 8 0 0 0 176 72h32a8 8 0 0 1 8 8ZM128 88a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 72a28 28 0 1 1 28-28a28 28 0 0 1-28 28"
      />
    </svg>
  );
};

export const UploadCloud: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = "60", colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        fill={`url(#${gradientId})`}
        d="m12 12.586l4.243 4.242l-1.415 1.415L13 16.415V22h-2v-5.587l-1.828 1.83l-1.415-1.415zM12 2a7 7 0 0 1 6.954 6.194A5.5 5.5 0 0 1 18 18.978v-2.014a3.5 3.5 0 1 0-1.111-6.91a5 5 0 1 0-9.777 0a3.5 3.5 0 0 0-1.292 6.88l.18.03v2.014a5.5 5.5 0 0 1-.954-10.784A7 7 0 0 1 12 2"
      />
    </svg>
  );
};

export const BackArrow: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="m7.85 13 2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
      />
    </svg>
  );
};

export const Close: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"
      />
    </svg>
  );
};

export const RightArrow: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 60, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 8) / 11}
      viewBox="0 0 11 8"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <path
        d="M5.88741 2.80771L7.77018 2.80771L7.78864 2.81692C7.70557 2.72484 7.6502 2.66038 7.59482 2.60514L7.5948 2.60511C7.18872 2.20918 6.78264 1.81324 6.39502 1.4081C6.09969 1.09503 6.10892 0.680666 6.41348 0.367594C6.71805 0.0545228 7.15182 0.0176908 7.45638 0.321554C8.40695 1.25151 9.34828 2.19989 10.2896 3.14826L10.2898 3.14841C10.5759 3.44306 10.5851 3.87584 10.2898 4.1797C9.37606 5.12812 8.45314 6.06734 7.52099 7.00655C7.22565 7.30121 6.79188 7.28279 6.48731 6.98814C6.16429 6.68427 6.12737 6.26991 6.42271 5.94763C6.81034 5.53328 7.20719 5.13733 7.60405 4.73218C7.65943 4.66772 7.7148 4.61248 7.81632 4.50198L7.51176 4.50198L1.32817 4.50198C0.709816 4.50198 0.303731 3.9495 0.488315 3.38781C0.608295 3.0287 0.931317 2.80771 1.35586 2.80771L5.88741 2.80771Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export const FaceIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 48, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M34.4736 14.4897V19.4856"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9917 2H6.99587C4.23673 2 2 4.23673 2 6.99587V11.9917"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.9697 2H41.9656C44.7248 2 46.9615 4.23673 46.9615 6.99587V11.9917"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.4883 14.4897V19.4856"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9866 34.473C16.9866 34.473 19.4845 36.971 24.4804 36.971C29.4762 36.971 31.9742 34.473 31.9742 34.473"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.4816 14.4897V26.9794H21.9836"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9917 46.9624H6.99587C4.23673 46.9624 2 44.7258 2 41.9666V36.9707"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.9697 46.9624H41.9656C44.7248 46.9624 46.9615 44.7258 46.9615 41.9666V36.9707"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const RightIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 60, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 61 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M60.9996 31.0562C61.0841 47.6821 47.5162 61.4154 30.9363 61.4996C13.8498 61.5839 0.0566805 48.0472 0.000383913 31.1685C-0.0840613 14.4583 13.6246 0.584644 30.3452 0.500391C47.3473 0.416139 60.9152 13.8966 60.9996 31.0562ZM37.5795 28.4162C35.5528 28.4162 33.6949 28.4162 31.8371 28.4162C27.2206 28.4162 22.6042 28.4162 18.0158 28.4162C16.721 28.4162 15.7358 29.0903 15.3698 30.1856C14.8068 31.8987 16.0454 33.5838 17.9314 33.5838C24.2087 33.5838 30.4859 33.5838 36.7913 33.5838C37.0447 33.5838 37.298 33.5838 37.7203 33.5838C37.4106 33.9208 37.2417 34.0893 37.0728 34.2859C35.8624 35.5216 34.652 36.7292 33.4697 37.993C32.569 38.976 32.6816 40.2398 33.6668 41.1665C34.5957 42.0652 35.9187 42.1214 36.8195 41.2227C39.6625 38.3581 42.4775 35.4935 45.2642 32.6008C46.165 31.674 46.1369 30.3541 45.2642 29.4554C42.393 26.5627 39.5218 23.67 36.6224 20.8335C35.6935 19.9067 34.3705 20.019 33.4416 20.9739C32.5127 21.9288 32.4845 23.1926 33.3853 24.1474C34.5675 25.3831 35.8061 26.5908 37.0447 27.7984C37.2136 27.9669 37.3825 28.1635 37.6358 28.4443L37.5795 28.4162Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export const ErrorIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 60, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      width={(size / 46) * 12}
      height={size}
      viewBox="0 0 12 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M6 0C9.31371 0 12 2.68629 12 6V27C12 29.3618 10.6351 31.4039 8.65122 32.3826C8.27117 32.5701 8 32.9406 8 33.3643V33.6346C8 34.0584 8.2712 34.4289 8.65127 34.6164C10.6352 35.5953 12 37.6381 12 40C12 43.3137 9.31371 46 6 46C2.68629 46 0 43.3137 0 40C0 37.6381 1.36481 35.5953 3.34873 34.6164C3.7288 34.4289 4 34.0584 4 33.6346V33.3643C4 32.9406 3.72883 32.5701 3.34878 32.3826C1.36495 31.4039 6.88794e-08 29.3618 0 27V6C9.66416e-08 2.68629 2.68629 0 6 0Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export const CameraErrorIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 60, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId1 = `cameraGradient1-${id}`;
  const gradientId2 = `cameraGradient2-${id}`;
  const gradientId3 = `cameraGradient3-${id}`;

  return (
    <svg
      width={size}
      height={(size / 58) * 49}
      viewBox="0 0 58 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId1}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>

        <linearGradient
          id={gradientId2}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>

        <linearGradient
          id={gradientId3}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <path
        d="M5.13989 16.3834C5.13989 15.5653 5.13989 15.1563 5.17403 14.8118C5.50324 11.4891 8.1318 8.86051 11.4545 8.5313C11.799 8.49717 12.2301 8.49717 13.0923 8.49717C13.4245 8.49717 13.5906 8.49717 13.7317 8.48862C15.5326 8.37956 17.1096 7.24292 17.7825 5.56893C17.8352 5.43783 17.8845 5.29005 17.983 4.99449C18.0815 4.69893 18.1308 4.55115 18.1835 4.42006C18.8565 2.74607 20.4335 1.60943 22.2344 1.50036C22.3754 1.49182 22.5312 1.49182 22.8427 1.49182H34.1394C34.4509 1.49182 34.6067 1.49182 34.7477 1.50036C36.5486 1.60943 38.1256 2.74607 38.7986 4.42006C38.8513 4.55115 38.9005 4.69893 38.9991 4.99449C39.0976 5.29005 39.1468 5.43783 39.1995 5.56893C39.8725 7.24292 41.4495 8.37956 43.2504 8.48862C43.3914 8.49717 43.5575 8.49717 43.8898 8.49717C44.7519 8.49717 45.183 8.49717 45.5275 8.5313C48.8503 8.86051 51.4788 11.4891 51.8081 14.8118C51.8422 15.1563 51.8422 15.5653 51.8422 16.3834V34.6505C51.8422 38.5738 51.8422 40.5355 51.0787 42.034C50.407 43.3522 49.3353 44.4238 48.0172 45.0955C46.5187 45.859 44.557 45.859 40.6336 45.859H16.3484C12.4251 45.859 10.4634 45.859 8.96488 45.0955C7.64674 44.4238 6.57506 43.3522 5.90343 42.034C5.13989 40.5355 5.13989 38.5738 5.13989 34.6505V16.3834Z"
        stroke={`url(#${gradientId1})`}
        strokeWidth="2.77643"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.491 35.351C33.6496 35.351 37.8315 31.1691 37.8315 26.0105C37.8315 20.8519 33.6496 16.6701 28.491 16.6701C23.3324 16.6701 19.1506 20.8519 19.1506 26.0105C19.1506 31.1691 23.3324 35.351 28.491 35.351Z"
        stroke={`url(#${gradientId2})`}
        strokeWidth="2.77643"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        y="46.1616"
        width="69"
        height="3"
        rx="1.5"
        transform="rotate(-36.623 0 46.1616)"
        fill={`url(#${gradientId3})`}
      />
    </svg>
  );
};

export const IproovCameraErrorIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 60, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 51 47"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M48.9863 22.4685V29.7071C48.9863 34.938 48.9863 37.5535 47.9682 39.5515C47.0728 41.3089 45.6439 42.7378 43.8865 43.6333C41.8885 44.6513 39.273 44.6513 34.0421 44.6513H17.2298C11.9989 44.6513 9.3834 44.6513 7.38544 43.6333C5.62798 42.7378 4.19913 41.3089 3.30366 39.5515C2.28564 37.5535 2.28564 34.938 2.28564 29.7071V17.5649C2.28564 12.334 2.28564 9.71849 3.30366 7.72052C4.19913 5.96307 5.62798 4.53421 7.38544 3.63874C9.3834 2.62073 11.9989 2.62073 17.2298 2.62073H26.8035M47.9682 12.2857L37.7142 2.62073M37.7142 12.2857L47.9682 2.62073M34.9761 23.636C34.9761 28.7944 30.7944 32.9761 25.636 32.9761C20.4775 32.9761 16.2958 28.7944 16.2958 23.636C16.2958 18.4776 20.4775 14.2959 25.636 14.2959C30.7944 14.2959 34.9761 18.4776 34.9761 23.636Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.42857"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconApp: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 60, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className="icon-app"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <circle cx="256" cy="256" r="256" fill={`url(#${gradientId})`} />

      <g fill="#ffffff" className="bars">
        <rect
          x="96"
          y="188"
          width="72"
          height="180"
          rx="36"
          className="bar bar1"
        />
        <circle cx="216" cy="316" r="38" className="bar bar2" />
        <rect
          x="264"
          y="156"
          width="72"
          height="216"
          rx="36"
          className="bar bar3"
        />
        <path
          d="M386 282a38 38 0 0 1 38 38v26a12 12 0 0 1-12 12h-52a38 38 0 0 1 26-76z"
          className="bar bar4"
        />
      </g>
    </svg>
  );
};

export const LolaLogo: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
    width?: number | string;
    height?: number | string;
  }
> = ({ size = 60, colors = ["#000", "#000"], width, height, ...props }) => {
  const finalWidth = width || size;
  const finalHeight = height || size;
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 236 143"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="24"
          y1="0"
          x2="212"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <path
        d="M93.9502 86.7979C105.47 86.798 114.833 95.9371 114.833 107.217V107.635C114.833 118.915 105.47 128.054 93.9502 128.054C82.43 128.054 73.0664 118.915 73.0664 107.635V107.217C73.0666 95.937 82.4301 86.7979 93.9502 86.7979Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M142.535 14C154.055 14 163.419 23.139 163.419 34.4189V107.634C163.419 118.914 154.055 128.053 142.535 128.053C131.015 128.053 121.651 118.914 121.651 107.634V34.4189C121.651 23.139 131.015 14 142.535 14Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M44.8838 32.6436C56.4039 32.6437 65.7666 41.7826 65.7666 53.0625V107.582C65.7666 118.862 56.4039 128.001 44.8838 128.001C33.3635 128.001 24 118.862 24 107.582V53.0625C24 41.7825 33.3145 32.6436 44.8838 32.6436Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M191.117 86.0654C202.637 86.0656 212 95.2562 212 106.536V121.42C212 125.075 209.01 127.999 205.284 127.999H191.117C179.597 127.999 170.234 118.861 170.233 107.581V106.484C170.233 95.2044 179.597 86.0654 191.117 86.0654Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export const SuccessIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 60, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>

        <mask id="checkMask">
          <rect width="64" height="64" fill="white" />
          <path
            d="M46.2413 21.3287L26.6858 42.6621L17.7969 32.9651"
            stroke="black"
            strokeWidth="3.55556"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
      </defs>

      <circle
        cx="32"
        cy="32"
        r="32"
        fill={`url(#${gradientId})`}
        mask="url(#checkMask)"
      />
    </svg>
  );
};

export const CardIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 60, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 40) / 59}
      viewBox="0 0 59 40"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <rect
        x="1.74772"
        y="1.93174"
        width="55.5046"
        height="36.2393"
        rx="6.04106"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.49545"
      />
      <rect
        x="6.62012"
        y="13.5841"
        width="32.5102"
        height="3.61225"
        rx="1.80612"
        fill={`url(#${gradientId})`}
      />
      <rect
        x="6.62012"
        y="20.8086"
        width="30.102"
        height="3.61225"
        rx="1.80612"
        fill={`url(#${gradientId})`}
      />
      <rect
        x="6.62012"
        y="28.0331"
        width="34.9184"
        height="3.61225"
        rx="1.80612"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export const AddCardIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 28, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 15) / 19}
      viewBox="0 0 19 15"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <path
        d="M15.0413 14.15V9.11155M12.522 11.6308H17.5605M17.5605 4.91283H0.765625M17.5605 6.59232V3.40129C17.5605 2.46069 17.5605 1.99039 17.3774 1.63113C17.2164 1.31511 16.9595 1.05818 16.6435 0.897166C16.2842 0.714111 15.8139 0.714111 14.8733 0.714111H3.45281C2.5122 0.714111 2.0419 0.714111 1.68264 0.897165C1.36663 1.05818 1.1097 1.31511 0.948678 1.63113C0.765625 1.99039 0.765625 2.46069 0.765625 3.40129V9.78334C0.765625 10.7239 0.765625 11.1942 0.948678 11.5535C1.1097 11.8695 1.36663 12.1264 1.68264 12.2875C2.0419 12.4705 2.5122 12.4705 3.4528 12.4705H9.16306"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.25962"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const RightRoundedIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 31 30"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <path
        d="M30.6277 15.0276C30.6693 23.2043 23.9965 29.9584 15.8425 29.9998C7.43929 30.0412 0.655806 23.3839 0.628118 15.0829C0.586588 6.86475 7.32854 0.0416281 15.5518 0.000192526C23.9135 -0.0412431 30.5862 6.58851 30.6277 15.0276ZM19.1097 13.7293C18.1129 13.7293 17.1992 13.7293 16.2855 13.7293C14.0151 13.7293 11.7447 13.7293 9.48818 13.7293C8.85136 13.7293 8.36683 14.0608 8.18686 14.5995C7.90998 15.442 8.51911 16.2707 9.44665 16.2707C12.5338 16.2707 15.621 16.2707 18.722 16.2707C18.8466 16.2707 18.9712 16.2707 19.1789 16.2707C19.0266 16.4364 18.9435 16.5193 18.8605 16.616C18.2652 17.2237 17.6699 17.8176 17.0885 18.4392C16.6455 18.9226 16.7008 19.5441 17.1854 19.9999C17.6422 20.4419 18.2929 20.4695 18.7359 20.0276C20.1341 18.6187 21.5185 17.2099 22.889 15.7873C23.332 15.3315 23.3182 14.6823 22.889 14.2403C21.477 12.8177 20.0649 11.3951 18.639 10.0001C18.1821 9.54427 17.5315 9.59952 17.0746 10.0691C16.6178 10.5387 16.6039 11.1603 17.0469 11.6299C17.6284 12.2376 18.2375 12.8315 18.8466 13.4254C18.9297 13.5083 19.0127 13.605 19.1373 13.7431L19.1097 13.7293Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export const HomeAddressIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      width={size}
      height={(size * 15) / 17}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M6.45937 14.3239V8.97299C6.45937 8.56802 6.45937 8.36553 6.53818 8.21085C6.60751 8.0748 6.71812 7.96418 6.85418 7.89485C7.00886 7.81604 7.21135 7.81604 7.61632 7.81604H9.64098C10.046 7.81604 10.2484 7.81604 10.4031 7.89485C10.5392 7.96418 10.6498 8.0748 10.7191 8.21085C10.7979 8.36553 10.7979 8.56802 10.7979 8.97299V14.3239M1.39771 6.0083L7.93448 1.10572C8.18341 0.919025 8.30788 0.825676 8.44457 0.789691C8.56524 0.757928 8.69206 0.757928 8.81273 0.789691C8.94942 0.825676 9.07389 0.919025 9.32282 1.10572L15.8596 6.0083M2.8439 4.92366V12.01C2.8439 12.8199 2.8439 13.2249 3.00152 13.5343C3.14017 13.8064 3.36141 14.0276 3.63353 14.1663C3.94289 14.3239 4.34786 14.3239 5.1578 14.3239H12.0995C12.9094 14.3239 13.3144 14.3239 13.6238 14.1663C13.8959 14.0276 14.1171 13.8064 14.2558 13.5343C14.4134 13.2249 14.4134 12.8199 14.4134 12.01V4.92366L10.017 1.62635C9.51913 1.25295 9.2702 1.06626 8.9968 0.994287C8.75548 0.930761 8.50182 0.930761 8.2605 0.994287C7.9871 1.06626 7.73817 1.25295 7.24031 1.62635L2.8439 4.92366Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.08464"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const WhatsAppIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
  }
> = ({ size = 36, ...props }) => {
  return (
    <svg
      width={size}
      height={size + 1}
      viewBox="0 0 111 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30.3765 93.6734L32.0395 94.659C39.0271 98.8059 47.0384 100.999 55.208 101.003H55.2258C80.3158 101.003 100.736 80.5881 100.745 55.4966C100.749 43.3363 96.0192 31.9033 87.425 23.3011C78.8301 14.7005 67.4027 9.96071 55.2421 9.95565C30.1334 9.95565 9.71319 30.3679 9.70372 55.4593C9.7004 64.0576 12.1057 72.4317 16.663 79.6762L17.7462 81.3983L13.1466 98.1906L30.3765 93.6734ZM-0.00195312 111.198L7.76765 82.8279C2.97527 74.5247 0.454127 65.1056 0.458074 55.4568C0.469756 25.2694 25.0365 0.709961 55.2271 0.709961C69.8768 0.716276 83.6273 6.41781 93.9677 16.7666C104.307 27.1153 109.999 40.8715 109.994 55.501C109.982 85.6868 85.4097 110.251 55.2271 110.251C55.2247 110.251 55.2282 110.251 55.2271 110.251H55.2036C46.0378 110.248 37.0314 107.949 29.0324 103.586L-0.00195312 111.198Z"
        fill="white"
      />
      <path
        d="M2.34416 55.4851C2.34085 64.799 4.77454 73.8924 9.4021 81.9089L1.90088 109.297L29.9287 101.948C37.651 106.156 46.3453 108.378 55.1938 108.38H55.2166C84.3558 108.38 108.074 84.6689 108.086 55.5265C108.092 41.4036 102.597 28.1256 92.6146 18.1341C82.6334 8.14411 69.3591 2.63944 55.2143 2.63281C26.0735 2.63281 2.3568 26.3412 2.34416 55.4851ZM55.2166 108.38C55.2155 108.38 55.216 108.38 55.2166 108.38V108.38Z"
        fill="url(#paint0_linear_2402_10562)"
      />
      <path
        d="M0.458074 55.4688C0.454758 65.1175 2.9759 74.5375 7.76828 82.8397L-0.00195312 111.209L29.0314 103.596C37.031 107.958 46.0368 110.257 55.2026 110.261H55.2261C85.4087 110.261 109.981 85.697 109.993 55.5112C109.998 40.8808 104.306 27.1251 93.9667 16.777C83.6258 6.4287 69.8762 0.72653 55.2261 0.720215C25.0372 0.720215 0.469782 25.2796 0.457152 55.467M17.7468 81.4093L16.663 79.688C12.1057 72.4425 9.70043 64.0686 9.70374 55.4712C9.71369 30.3814 30.1334 9.96747 55.2421 9.96747C67.4015 9.97219 78.8292 14.7124 87.425 23.313C96.0199 31.914 100.749 43.3479 100.746 55.5068C100.735 80.5983 80.3148 101.014 55.225 101.014H55.2072C47.0377 101.009 39.0257 98.816 32.0385 94.6698L30.3755 93.684L13.1459 98.2012L17.7468 81.4093ZM55.2261 110.261C55.225 110.261 55.2256 110.261 55.2261 110.261V110.261Z"
        fill="url(#paint1_linear_2402_10562)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.5361 32.5789C40.5108 30.3 39.432 30.2545 38.4569 30.2143C37.6588 30.1804 36.7461 30.1826 35.8344 30.1826C34.9217 30.1826 33.4392 30.5251 32.1855 31.8945C30.9307 33.2639 27.3955 36.5743 27.3955 43.3067C27.3955 50.0398 32.2998 56.5456 32.9831 57.4594C33.6675 58.3717 42.45 72.6298 56.3582 78.1147C67.918 82.673 70.2703 81.7663 72.7793 81.5379C75.2883 81.3101 80.8758 78.2288 82.0157 75.0333C83.1563 71.8382 83.1563 69.0994 82.8143 68.5275C82.4723 67.9571 81.5596 67.6146 80.1912 66.9308C78.8223 66.2464 72.0948 62.9356 70.8408 62.4788C69.5859 62.0227 68.6736 61.795 67.7609 63.165C66.8486 64.5332 64.2279 67.6147 63.4293 68.5275C62.6312 69.442 61.8326 69.5561 60.4642 68.8717C59.0953 68.1849 54.6879 66.7414 49.4596 62.08C45.3913 58.453 42.6452 53.9737 41.8466 52.6036C41.0485 51.2352 41.7613 50.4941 42.4474 49.8118C43.0623 49.1986 43.8163 48.214 44.5008 47.4153C45.1836 46.6162 45.4113 46.046 45.8674 45.1331C46.3242 44.2197 46.0957 43.4206 45.7539 42.736C45.4113 42.0516 42.7529 35.2849 41.5361 32.5789Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2402_10562"
          x1="54.9942"
          y1="109.286"
          x2="54.9942"
          y2="2.62161"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#20B038" />
          <stop offset="1" stopColor="#60D66A" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2402_10562"
          x1="54.9965"
          y1="111.212"
          x2="54.9965"
          y2="0.723534"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F3F2F2" />
          <stop offset="1" stopColor="#F7F7F7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const UploadIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 23 23"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="23"
          y2="23"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <path
        d="M21.3091 14.7955V19.1551C21.3091 19.7332 21.0794 20.2876 20.6706 20.6964C20.2618 21.1052 19.7074 21.3348 19.1293 21.3348L3.87093 21.3348C3.29282 21.3348 2.73839 21.1052 2.3296 20.6964C1.92082 20.2876 1.69116 19.7332 1.69116 19.1551L1.69116 14.7955"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.15318"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9496 7.16638L11.5002 1.71697L6.05078 7.16638"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.15318"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 1.71693V14.7955"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.15318"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CreditCardIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 13) / 17}
      viewBox="0 0 17 13"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="17"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M14.625 6.75C14.625 6.43934 14.3732 6.1875 14.0625 6.1875H9.5625C9.25184 6.1875 9 6.43934 9 6.75C9 7.06066 9.25184 7.3125 9.5625 7.3125H14.0625C14.3732 7.3125 14.625 7.06066 14.625 6.75Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M14.0625 8.4375C14.3732 8.4375 14.625 8.68934 14.625 9C14.625 9.31066 14.3732 9.5625 14.0625 9.5625H10.6875C10.3768 9.5625 10.125 9.31066 10.125 9C10.125 8.68934 10.3768 8.4375 10.6875 8.4375H14.0625Z"
        fill={`url(#${gradientId})`}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4688 0C16.2454 0 16.875 0.629599 16.875 1.40625V10.9688C16.875 11.7454 16.2454 12.375 15.4688 12.375H1.40625C0.629599 12.375 0 11.7454 0 10.9688V1.40625C0 0.6296 0.629599 0 1.40625 0H15.4688ZM1.125 2.8125V1.40625C1.125 1.25092 1.25092 1.125 1.40625 1.125H15.4688C15.6241 1.125 15.75 1.25092 15.75 1.40625V2.8125H1.125ZM15.75 3.9375H1.125V10.9688C1.125 11.1241 1.25092 11.25 1.40625 11.25H15.4688C15.6241 11.25 15.75 11.1241 15.75 10.9688V3.9375Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export const DebitCardIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 13) / 18}
      viewBox="0 0 18 13"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="18"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M2.375 6.75C2.375 6.43934 2.64083 6.1875 2.96875 6.1875H7.71875C8.04667 6.1875 8.3125 6.43934 8.3125 6.75C8.3125 7.06066 8.04667 7.3125 7.71875 7.3125H2.96875C2.64083 7.3125 2.375 7.06066 2.375 6.75Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M2.96875 8.4375C2.64083 8.4375 2.375 8.68934 2.375 9C2.375 9.31066 2.64083 9.5625 2.96875 9.5625H6.53125C6.85917 9.5625 7.125 9.31066 7.125 9C7.125 8.68934 6.85917 8.4375 6.53125 8.4375H2.96875Z"
        fill={`url(#${gradientId})`}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.48438 0C0.664578 0 0 0.629599 0 1.40625V10.9688C0 11.7454 0.664577 12.375 1.48437 12.375H16.3281C17.1479 12.375 17.8125 11.7454 17.8125 10.9688V1.40625C17.8125 0.6296 17.1479 0 16.3281 0H1.48438ZM16.625 2.8125V1.40625C16.625 1.25092 16.4921 1.125 16.3281 1.125H1.48438C1.32042 1.125 1.1875 1.25092 1.1875 1.40625V2.8125H16.625ZM1.1875 3.9375H16.625V10.9688C16.625 11.1241 16.4921 11.25 16.3281 11.25H1.48437C1.32042 11.25 1.1875 11.1241 1.1875 10.9688V3.9375Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export const BankIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = "24", colors = ["#000", "#000"], ...props }) => {
  const idGradient = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.18534 7.53317V14.2296M7.9521 7.53317V14.2296M12.1374 7.53317V14.2296M15.9041 7.53317V14.2296M2.51123 15.5689L2.51123 16.2386C2.51123 16.7074 2.51123 16.9418 2.60246 17.1208C2.68272 17.2783 2.81077 17.4064 2.96827 17.4866C3.14733 17.5778 3.38173 17.5778 3.85052 17.5778H16.239C16.7078 17.5778 16.9422 17.5778 17.1212 17.4866C17.2787 17.4064 17.4068 17.2783 17.487 17.1208C17.5782 16.9418 17.5782 16.7074 17.5782 16.2386V15.5689C17.5782 15.1001 17.5782 14.8657 17.487 14.6867C17.4068 14.5292 17.2787 14.4011 17.1212 14.3209C16.9422 14.2296 16.7078 14.2296 16.239 14.2296H3.85052C3.38173 14.2296 3.14733 14.2296 2.96827 14.3209C2.81077 14.4011 2.68272 14.5292 2.60246 14.6867C2.51123 14.8657 2.51123 15.1001 2.51123 15.5689ZM9.75421 2.57539L3.55999 3.95189C3.18577 4.03505 2.99867 4.07662 2.859 4.17725C2.7358 4.266 2.63907 4.38659 2.57916 4.5261C2.51123 4.68427 2.51123 4.87594 2.51123 5.25928L2.51123 6.19388C2.51123 6.66267 2.51123 6.89707 2.60246 7.07613C2.68272 7.23363 2.81077 7.36168 2.96827 7.44194C3.14733 7.53317 3.38173 7.53317 3.85052 7.53317H16.239C16.7078 7.53317 16.9422 7.53317 17.1212 7.44194C17.2787 7.36168 17.4068 7.23363 17.487 7.07613C17.5782 6.89707 17.5782 6.66268 17.5782 6.19388V5.25929C17.5782 4.87594 17.5782 4.68427 17.5103 4.5261C17.4504 4.38659 17.3537 4.266 17.2305 4.17725C17.0908 4.07663 16.9037 4.03505 16.5295 3.95189L10.3353 2.57539C10.2269 2.5513 10.1726 2.53925 10.1179 2.53445C10.0692 2.53018 10.0203 2.53018 9.97162 2.53445C9.91684 2.53925 9.86263 2.5513 9.75421 2.57539Z"
        stroke={`url(#${idGradient})`}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={idGradient}
          x1="0"
          y1="10.5"
          x2="21"
          y2="10.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const CashIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 13) / 18} // mantiene proporción original
      viewBox="0 0 18 13"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="18"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.48438 0C0.664577 0 0 0.629599 0 1.40625V10.9688C0 11.7454 0.664576 12.375 1.48437 12.375H16.3281C17.1479 12.375 17.8125 11.7454 17.8125 10.9688V1.40625C17.8125 0.6296 17.1479 0 16.3281 0H1.48438ZM16.625 3.9375V1.40625C16.625 1.25092 16.4921 1.125 16.3281 1.125H1.48438C1.32042 1.125 1.1875 1.25092 1.1875 1.40625V3.9375H16.625ZM1.1875 3.9375H16.625V10.9688C16.625 11.1241 16.4921 11.25 16.3281 11.25H1.48437C1.32042 11.25 1.1875 11.1241 1.1875 10.9688V3.9375Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M9 3V10"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6667 4H8.16667C7.85725 4 7.5605 4.1317 7.34171 4.36612C7.12292 4.60054 7 4.91848 7 5.25C7 5.58152 7.12292 5.89946 7.34171 6.13388C7.5605 6.3683 7.85725 6.5 8.16667 6.5H9.83333C10.1428 6.5 10.4395 6.6317 10.6583 6.86612C10.8771 7.10054 11 7.41848 11 7.75C11 8.08152 10.8771 8.39946 10.6583 8.63388C10.4395 8.8683 10.1428 9 9.83333 9H7"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ErrorUserIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 31) / 59}
      viewBox="0 0 59 31"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="59"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M33.3093 10.772C33.3093 9.92213 34.0021 9.23316 34.8569 9.23316H42.5949C43.4496 9.23316 44.1425 9.92213 44.1425 10.772C44.1425 11.6219 43.4496 12.3109 42.5949 12.3109H34.8569C34.0021 12.3109 33.3093 11.6219 33.3093 10.772Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M34.8569 15.3886C34.0021 15.3886 33.3093 16.0776 33.3093 16.9275C33.3093 17.7773 34.0021 18.4663 34.8569 18.4663H45.6901C46.5448 18.4663 47.2377 17.7773 47.2377 16.9275C47.2377 16.0776 46.5448 15.3886 45.6901 15.3886H34.8569Z"
        fill={`url(#${gradientId})`}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6428 30.7772C9.07866 30.7772 7 28.7103 7 26.1606V4.61658C7 2.06691 9.07866 0 11.6428 0L48.7853 0C51.3494 0 53.4281 2.06691 53.4281 4.61658V26.1606C53.4281 28.7103 51.3494 30.7772 48.7853 30.7772H11.6428ZM11.6428 3.07772C10.7881 3.07772 10.0952 3.76669 10.0952 4.61658V26.1606C10.0952 27.0105 10.7881 27.6995 11.6428 27.6995H11.7882C12.4402 24.3054 15.2161 21.6857 18.725 20.5796C18.6855 20.5578 18.6462 20.5357 18.607 20.5132C16.2129 19.1387 14.738 16.5986 14.738 13.8497C14.738 11.1008 16.2129 8.56073 18.607 7.18628C21.0012 5.81183 23.9509 5.81183 26.345 7.18628C28.7392 8.56073 30.2141 11.1008 30.2141 13.8497C30.2141 16.5986 28.7392 19.1387 26.345 20.5132C26.3059 20.5357 26.2665 20.5578 26.2271 20.5796C29.736 21.6857 32.5118 24.3054 33.1638 27.6995H48.7853C49.64 27.6995 50.3329 27.0105 50.3329 26.1606V4.61658C50.3329 3.76669 49.64 3.07772 48.7853 3.07772H11.6428ZM29.9603 27.6995C29.1213 25.1766 26.2727 23.0829 22.476 23.0829C18.6793 23.0829 15.8307 25.1766 14.9918 27.6995H29.9603ZM17.8332 13.8497C17.8332 15.4991 18.7181 17.0231 20.1546 17.8478C21.5911 18.6725 23.3609 18.6725 24.7974 17.8478C26.2339 17.0231 27.1188 15.4991 27.1188 13.8497C27.1188 12.2004 26.2339 10.6763 24.7974 9.85166C23.3609 9.02699 21.5911 9.02699 20.1546 9.85166C18.7181 10.6763 17.8332 12.2004 17.8332 13.8497Z"
        fill={`url(#${gradientId})`}
      />
      <rect
        y="18"
        width="4"
        height="59"
        rx="2"
        transform="rotate(-90 0 18)"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export const RoundedCheckIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 58 58"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="58"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M16.7587 28.9502L24.8863 37.0778L41.1417 20.8225M56.0424 28.9502C56.0424 43.9128 43.9128 56.0424 28.9502 56.0424C13.9875 56.0424 1.85791 43.9128 1.85791 28.9502C1.85791 13.9875 13.9875 1.85791 28.9502 1.85791C43.9128 1.85791 56.0424 13.9875 56.0424 28.9502Z"
        stroke={`url(#${gradientId})`}
        strokeWidth={3.71551}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UserInfoIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 47 31"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="47"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M26.3093 10.772C26.3093 9.92213 27.0021 9.23316 27.8569 9.23316H35.5949C36.4496 9.23316 37.1425 9.92213 37.1425 10.772C37.1425 11.6219 36.4496 12.3109 35.5949 12.3109H27.8569C27.0021 12.3109 26.3093 11.6219 26.3093 10.772Z"
        fill={`url(#${gradientId})`}
      />

      <path
        d="M27.8569 15.3886C27.0021 15.3886 26.3093 16.0776 26.3093 16.9275C26.3093 17.7773 27.0021 18.4663 27.8569 18.4663H38.6901C39.5448 18.4663 40.2377 17.7773 40.2377 16.9275C40.2377 16.0776 39.5448 15.3886 38.6901 15.3886H27.8569Z"
        fill={`url(#${gradientId})`}
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.64281 30.7772C2.07866 30.7772 0 28.7103 0 26.1606L0 4.61658C0 2.06691 2.07866 0 4.64281 0L41.7853 0C44.3494 0 46.4281 2.06691 46.4281 4.61658V26.1606C46.4281 28.7103 44.3494 30.7772 41.7853 30.7772H4.64281ZM4.64281 3.07772C3.78809 3.07772 3.09521 3.76669 3.09521 4.61658V26.1606C3.09521 27.0105 3.78809 27.6995 4.64281 27.6995H4.78824C5.44022 24.3054 8.21607 21.6857 11.725 20.5796C11.6855 20.5578 11.6462 20.5357 11.607 20.5132C9.21287 19.1387 7.73802 16.5986 7.73802 13.8497C7.73802 11.1008 9.21287 8.56073 11.607 7.18628C14.0012 5.81183 16.9509 5.81183 19.345 7.18628C21.7392 8.56073 23.2141 11.1008 23.2141 13.8497C23.2141 16.5986 21.7392 19.1387 19.345 20.5132C19.3059 20.5357 19.2665 20.5578 19.2271 20.5796C22.736 21.6857 25.5118 24.3054 26.1638 27.6995H41.7853C42.64 27.6995 43.3329 27.0105 43.3329 26.1606V4.61658C43.3329 3.76669 42.64 3.07772 41.7853 3.07772H4.64281ZM22.9603 27.6995C22.1213 25.1766 19.2727 23.0829 15.476 23.0829C11.6793 23.0829 8.83074 25.1766 7.99177 27.6995H22.9603ZM10.8332 13.8497C10.8332 15.4991 11.7181 17.0231 13.1546 17.8478C14.5911 18.6725 16.3609 18.6725 17.7974 17.8478C19.2339 17.0231 20.1188 15.4991 20.1188 13.8497C20.1188 12.2004 19.2339 10.6763 17.7974 9.85166C16.3609 9.02699 14.5911 9.02699 13.1546 9.85166C11.7181 10.6763 10.8332 12.2004 10.8332 13.8497Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export const EditIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 27 27"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="27"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M12.0959 3.42868H6.80401C4.68704 3.42868 3.62856 3.42868 2.81999 3.84067C2.10875 4.20307 1.53049 4.78132 1.16809 5.49257C0.756104 6.30114 0.756104 7.35962 0.756104 9.47659V20.0604C0.756104 22.1774 0.756104 23.2359 1.16809 24.0444C1.53049 24.7557 2.10875 25.3339 2.81999 25.6963C3.62856 26.1083 4.68704 26.1083 6.80401 26.1083H17.3878C19.5048 26.1083 20.5633 26.1083 21.3719 25.6963C22.0831 25.3339 22.6614 24.7557 23.0238 24.0444C23.4357 23.2359 23.4357 22.1774 23.4357 20.0604V14.7685M8.31595 18.5484H10.4258C11.0422 18.5484 11.3504 18.5484 11.6404 18.4788C11.8975 18.4171 12.1433 18.3153 12.3688 18.1771C12.6231 18.0213 12.841 17.8034 13.2769 17.3675L25.3257 5.31865C26.3695 4.27485 26.3695 2.58251 25.3257 1.53871C24.2819 0.49491 22.5896 0.494908 21.5458 1.53871L9.49688 13.5876C9.06105 14.0234 8.84313 14.2413 8.68729 14.4956C8.54913 14.7211 8.44731 14.9669 8.38558 15.224C8.31595 15.5141 8.31595 15.8222 8.31595 16.4386V18.5484Z"
        stroke={`url(#${gradientId})`}
        strokeWidth={1.51198}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const HeartOutlineIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 24, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="24"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M12 21C12 21 4 16.2727 4 9.81818C4 6.96364 6.18182 5 8.72727 5C10.2909 5 11.6909 5.81818 12 6.90909C12.3091 5.81818 13.7091 5 15.2727 5C17.8182 5 20 6.96364 20 9.81818C20 16.2727 12 21 12 21Z"
        stroke={`url(#${gradientId})`}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const HeartIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 24, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="24"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <path
        d="M12 21C12 21 4 16.2727 4 9.81818C4 6.96364 6.18182 5 8.72727 5C10.2909 5 11.6909 5.81818 12 6.90909C12.3091 5.81818 13.7091 5 15.2727 5C17.8182 5 20 6.96364 20 9.81818C20 16.2727 12 21 12 21Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export const CashSpecialIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.99996 9.16634V12.4997M15 7.49967V10.833M14.1666 3.33301C16.2072 3.33301 17.3109 3.64531 17.8601 3.88754C17.9332 3.9198 17.9698 3.93593 18.0753 4.03665C18.1386 4.09702 18.254 4.27417 18.2837 4.35641C18.3333 4.49362 18.3333 4.56862 18.3333 4.71863V13.6756C18.3333 14.4329 18.3333 14.8116 18.2197 15.0062C18.1042 15.2042 17.9928 15.2962 17.7766 15.3723C17.564 15.4471 17.1349 15.3647 16.2768 15.1998C15.6761 15.0844 14.9637 14.9997 14.1666 14.9997C11.6666 14.9997 9.16663 16.6663 5.83329 16.6663C3.7927 16.6663 2.68901 16.354 2.13986 16.1118C2.06673 16.0795 2.03016 16.0634 1.92463 15.9627C1.86136 15.9023 1.74589 15.7252 1.71618 15.6429C1.66663 15.5057 1.66663 15.4307 1.66663 15.2807L1.66663 6.32372C1.66663 5.56641 1.66663 5.18776 1.78019 4.99313C1.89571 4.79514 2.00712 4.7031 2.22334 4.62702C2.43591 4.55222 2.86499 4.63466 3.72315 4.79955C4.32381 4.91496 5.03619 4.99967 5.83329 4.99967C8.33329 4.99967 10.8333 3.33301 14.1666 3.33301ZM12.0833 9.99967C12.0833 11.1503 11.1506 12.083 9.99996 12.083C8.84937 12.083 7.91663 11.1503 7.91663 9.99967C7.91663 8.84908 8.84937 7.91634 9.99996 7.91634C11.1506 7.91634 12.0833 8.84908 12.0833 9.99967Z"
        stroke={`url(#${gradientId})`}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="1.66663"
          y1="9.99967"
          x2="18.3333"
          y2="9.99967"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const EditPencilIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 18.0002L19.9999 19.0943C19.4695 19.6744 18.7501 20.0002 18.0001 20.0002C17.2501 20.0002 16.5308 19.6744 16.0004 19.0943C15.4692 18.5154 14.75 18.1903 14.0002 18.1903C13.2504 18.1903 12.5311 18.5154 12 19.0943M3 20.0002H4.67454C5.16372 20.0002 5.40832 20.0002 5.63849 19.945C5.84256 19.896 6.03765 19.8152 6.2166 19.7055C6.41843 19.5818 6.59138 19.4089 6.93729 19.063L19.5 6.50023C20.3285 5.6718 20.3285 4.32865 19.5 3.50023C18.6716 2.6718 17.3285 2.6718 16.5 3.50023L3.93726 16.063C3.59136 16.4089 3.4184 16.5818 3.29472 16.7837C3.18506 16.9626 3.10425 17.1577 3.05526 17.3618C3 17.5919 3 17.8365 3 18.3257V20.0002Z"
        stroke={`url(#${gradientId})`}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="3"
          y1="11.4396"
          x2="21"
          y2="11.4396"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const UserCheckIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 15.5H7.5C6.10444 15.5 5.40665 15.5 4.83886 15.6722C3.56045 16.06 2.56004 17.0605 2.17224 18.3389C2 18.9067 2 19.6044 2 21M16 18L18 20L22 16M14.5 7.5C14.5 9.98528 12.4853 12 10 12C7.51472 12 5.5 9.98528 5.5 7.5C5.5 5.01472 7.51472 3 10 3C12.4853 3 14.5 5.01472 14.5 7.5Z"
        stroke={`url(#${gradientId})`}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="2"
          y1="12"
          x2="22"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const UserPlusIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 15.5H7.5C6.10444 15.5 5.40665 15.5 4.83886 15.6722C3.56045 16.06 2.56004 17.0605 2.17224 18.3389C2 18.9067 2 19.6044 2 21M19 21V15M16 18H22M14.5 7.5C14.5 9.98528 12.4853 12 10 12C7.51472 12 5.5 9.98528 5.5 7.5C5.5 5.01472 7.51472 3 10 3C12.4853 3 14.5 5.01472 14.5 7.5Z"
        stroke={`url(#${gradientId})`}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="2"
          y1="12"
          x2="22"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const WarningIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M33 22V33M33 44H33.0275M60.5 33C60.5 48.1878 48.1878 60.5 33 60.5C17.8122 60.5 5.5 48.1878 5.5 33C5.5 17.8122 17.8122 5.5 33 5.5C48.1878 5.5 60.5 17.8122 60.5 33Z"
        stroke={`url(#${gradientId})`}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="5.5"
          y1="33"
          x2="60.5"
          y2="33"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const UsaIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = "24", ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="12" fill="#F2F0F2" />
      <mask
        id="mask0_3313_7841"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <circle cx="12" cy="12" r="12" fill="#FCFCFC" />
      </mask>
      <g mask="url(#mask0_3313_7841)">
        <rect x="3.89998" y="21.3008" width="16.5" height="3" fill="#D90026" />
        <rect x="3.89998" y="21.3008" width="16.5" height="3" fill="#D90026" />
        <rect x="0.299994" y="15.3008" width="23.7" height="3" fill="#D90026" />
        <rect x="0.299994" y="15.3008" width="23.7" height="3" fill="#D90026" />
        <rect x="0.299994" y="9" width="23.7" height="3" fill="#D90026" />
        <rect x="0.299994" y="9" width="23.7" height="3" fill="#D90026" />
        <rect x="0.299994" y="3" width="23.7" height="3" fill="#D90026" />
        <rect x="0.299994" y="3" width="23.7" height="3" fill="#D90026" />
        <rect width="12.3" height="12" fill="#0052B5" />
        <path
          d="M9.90001 10.0486L9.00001 10.4986L9.30001 9.59863L8.70001 8.99863H9.60001L9.90001 8.09863L10.35 8.99863H11.1L10.5 9.59863L10.8 10.4986L9.90001 10.0486Z"
          fill="white"
        />
        <path
          d="M5.7 10.0486L4.8 10.4986L5.1 9.59863L4.5 8.99863H5.4L5.7 8.09863L6.15 8.99863H6.9L6.3 9.59863L6.6 10.4986L5.7 10.0486Z"
          fill="white"
        />
        <path
          d="M1.49999 10.0486L0.599994 10.4986L0.899994 9.59863L0.299994 8.99863H1.19999L1.49999 8.09863L1.94999 8.99863H2.69999L2.09999 9.59863L2.39999 10.4986L1.49999 10.0486Z"
          fill="white"
        />
        <path
          d="M9.90001 6.75078L9.00001 7.20078L9.30001 6.30078L8.70001 5.70078H9.60001L9.90001 4.80078L10.35 5.70078H11.1L10.5 6.30078L10.8 7.20078L9.90001 6.75078Z"
          fill="white"
        />
        <path
          d="M9.90001 3.45L9.00001 3.9L9.30001 3L8.70001 2.4H9.60001L9.90001 1.5L10.35 2.4H11.1L10.5 3L10.8 3.9L9.90001 3.45Z"
          fill="white"
        />
        <path
          d="M9.90001 0.149219L9.00001 0.599219L9.30001 -0.300781L8.70001 -0.900781H9.60001L9.90001 -1.80078L10.35 -0.900781H11.1L10.5 -0.300781L10.8 0.599219L9.90001 0.149219Z"
          fill="white"
        />
        <path
          d="M5.7 3.45L4.8 3.9L5.1 3L4.5 2.4H5.4L5.7 1.5L6.15 2.4H6.9L6.3 3L6.6 3.9L5.7 3.45Z"
          fill="white"
        />
        <path
          d="M5.7 6.75078L4.8 7.20078L5.1 6.30078L4.5 5.70078H5.4L5.7 4.80078L6.15 5.70078H6.9L6.3 6.30078L6.6 7.20078L5.7 6.75078Z"
          fill="white"
        />
        <path
          d="M1.49999 6.75078L0.599994 7.20078L0.899994 6.30078L0.299994 5.70078H1.19999L1.49999 4.80078L1.94999 5.70078H2.69999L2.09999 6.30078L2.39999 7.20078L1.49999 6.75078Z"
          fill="white"
        />
      </g>
    </svg>
  );
};

export const SpainIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = "24", ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 24C5.37258 24 -2.89694e-07 18.6274 0 12C2.89694e-07 5.37258 5.37258 -2.89694e-07 12 0C18.6274 2.89694e-07 24 5.37258 24 12C24 18.6274 18.6274 24 12 24Z"
        fill="#FFDB44"
      />
      <path
        d="M23.2445 7.8C21.542 3.244 17.1498 2.25106e-07 12 0C6.85017 -2.25106e-07 2.45801 3.244 0.755531 7.8L23.2445 7.8Z"
        fill="#D90026"
      />
      <path
        d="M0.75553 16.2C2.45801 20.756 6.85017 24 12 24C17.1498 24 21.542 20.756 23.2445 16.2L0.75553 16.2Z"
        fill="#D90026"
      />
    </svg>
  );
};

export const MexicoIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = "24", ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30.2735 14.7548C30.2735 22.9036 23.4966 29.5096 15.1368 29.5096C6.77696 29.5096 0 22.9036 0 14.7548C0 6.60594 6.77696 0 15.1368 0C23.4966 0 30.2735 6.60594 30.2735 14.7548Z"
        fill="#FFFFFF"
      />
      <path
        d="M9.8389 0.928972C4.09197 3.02229 0 8.42273 0 14.7548C0 21.0868 4.09197 26.4873 9.8389 28.5806V0.928972Z"
        fill="#006847"
      />
      <path
        d="M20.4346 28.5806C26.1816 26.4873 30.2735 21.0868 30.2735 14.7548C30.2735 8.42273 26.1816 3.02229 20.4346 0.928972V28.5806Z"
        fill="#CE1126"
      />
    </svg>
  );
};

export const UsersIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 36, colors = ["#000", "#000"], ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.2979 9.53625C22.9677 9.98383 23.7553 10.2227 24.5609 10.2227C25.6412 10.2227 26.6772 9.79358 27.4411 9.02969C28.205 8.2658 28.6342 7.22975 28.6342 6.14945C28.6342 5.34383 28.3953 4.55631 27.9477 3.88646C27.5001 3.21661 26.864 2.69453 26.1197 2.38623C25.3754 2.07794 24.5564 1.99727 23.7662 2.15444C22.9761 2.31161 22.2503 2.69955 21.6806 3.26921C21.111 3.83887 20.723 4.56465 20.5659 5.35479C20.4087 6.14493 20.4894 6.96393 20.7977 7.70822C21.106 8.45252 21.628 9.08868 22.2979 9.53625Z"
        fill="url(#usersGradient)"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.9617 18.3693C30.3799 16.2441 29.7668 14.764 28.6755 13.6727C27.2312 13.9447 26.0211 14.8779 24.5609 14.8779C23.1007 14.8779 21.8906 13.9447 21.6829 12.7299C20.8177 13.3013 20.4463 13.6727 19.355 14.764C18.7419 16.2441 18.7419 17.7874 18.7419 17.7874H30.9617Z"
        fill="url(#usersGradient)"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.81745 10.7757C7.785 11.4222 8.92254 11.7672 10.0862 11.7672C11.6466 11.7672 13.1432 11.1474 14.2466 10.044C15.35 8.94058 15.9698 7.44406 15.9698 5.88362C15.9698 4.71995 15.6248 3.58242 14.9783 2.61486C14.3318 1.6473 13.4129 0.893184 12.3378 0.447867C11.2627 0.00254922 10.0797 -0.113966 8.93837 0.113055C7.79706 0.340076 6.7487 0.900436 5.92586 1.72328C5.10302 2.54611 4.54266 3.59447 4.31564 4.73579C4.08862 5.8771 4.20514 7.0601 4.65045 8.13519C5.09577 9.21028 5.84989 10.1292 6.81745 10.7757Z"
        fill="url(#usersGradient)"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.3319 23.5345C17.6058 18.3269 12.1954 18.4914 10.0862 18.4914C7.97699 18.4914 2.56658 18.3269 0.840517 23.5345H19.3319Z"
        fill="url(#usersGradient)"
      />

      <defs>
        <linearGradient
          id="usersGradient"
          x1="0"
          y1="0"
          x2="32"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const SupportIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = "24", colors = ["#000", "#000"], ...props }) => {
  const idGradient = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="17.5" cy="17.5" r="17.5" fill={`url(#${idGradient})`} />

      <path
        d="M27.0833 22.2917V18.4583C27.0833 13.1656 22.7927 8.875 17.5 8.875C12.2072 8.875 7.91663 13.1656 7.91663 18.4583V22.2917M13.1875 26.125C11.8643 26.125 10.7916 25.0523 10.7916 23.7292V20.8542C10.7916 19.531 11.8643 18.4583 13.1875 18.4583C14.5106 18.4583 15.5833 19.531 15.5833 20.8542V23.7292C15.5833 25.0523 14.5106 26.125 13.1875 26.125ZM21.8125 26.125C20.4893 26.125 19.4166 25.0523 19.4166 23.7292V20.8542C19.4166 19.531 20.4893 18.4583 21.8125 18.4583C23.1356 18.4583 24.2083 19.531 24.2083 20.8542V23.7292C24.2083 25.0523 23.1356 26.125 21.8125 26.125Z"
        stroke="white"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient
          id={idGradient}
          x1="0"
          y1="17.5"
          x2="35"
          y2="17.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const ExchangeIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = "24", colors = ["#000", "#000"], ...props }) => {
  const idGradient = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${idGradient})`}>
        <path
          d="M7.48315 2.61919L1.49718 2.61919M1.49718 2.61919L2.99367 1.1227M1.49718 2.61919L2.99367 4.11569"
          stroke={colors[0]}
          strokeWidth={0.96832}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.4967 6.36023L7.48268 6.36023M7.48268 6.36023L5.98619 7.85672M7.48268 6.36023L5.98619 4.86373"
          stroke={colors[1]}
          strokeWidth={0.96832}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id={idGradient}>
          <rect
            width="8.97897"
            height="8.97897"
            fill="white"
            transform="translate(8.979 8.97897) rotate(-180)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const WalletIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = "24", colors = ["#000", "#000"], ...props }) => {
  const idGradient = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.75 11.6667H13.7583M2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V7.5C17.5 6.57953 16.7538 5.83333 15.8333 5.83333L4.16667 5.83333C3.24619 5.83333 2.5 5.08714 2.5 4.16667ZM2.5 4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5H14.1667M14.1667 11.6667C14.1667 11.8968 13.9801 12.0833 13.75 12.0833C13.5199 12.0833 13.3333 11.8968 13.3333 11.6667C13.3333 11.4365 13.5199 11.25 13.75 11.25C13.9801 11.25 14.1667 11.4365 14.1667 11.6667Z"
        stroke={`url(#${idGradient})`}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={idGradient}
          x1="10"
          y1="2.5"
          x2="10"
          y2="17.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const KapitalRIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 24, colors = ["#000", "#000"], ...props }) => {
  const idGradient = useId();
  const clipId = useId();
  return (
    <svg
      width={size}
      height={(size * 74) / 78}
      viewBox="0 0 78 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M63.7704 11.137H52.9619L40.8905 32.4304C39.2852 35.2627 39.2852 38.7353 40.8905 41.5677L52.9619 62.861H63.7704L51.6991 41.5677C50.0937 38.7353 50.0937 35.2627 51.6991 32.4304L63.7704 11.137Z"
          fill={`url(#${idGradient})`}
        />
        <path
          d="M0 25.862L5.40524 35.2685L29.791 35.1281C33.0341 35.1089 36.0266 33.3726 37.6645 30.5595L49.9788 9.40647L44.5736 0L32.2592 21.153C30.6214 23.9661 27.6289 25.7024 24.3858 25.7217L0 25.862Z"
          fill={`url(#${idGradient})`}
        />
        <path
          d="M44.5736 74L49.9788 64.5935L37.6645 43.4405C36.0266 40.6274 33.0341 38.8911 29.791 38.8719L5.40524 38.7315L0 48.138L24.3858 48.2783C27.6289 48.2976 30.6214 50.0339 32.2592 52.847L44.5736 74Z"
          fill={`url(#${idGradient})`}
        />
        <path
          d="M73.2166 74C71.8199 74 70.6795 73.5501 69.7783 72.6502C68.8771 71.758 68.4332 70.5985 68.4332 69.1929C68.4332 67.7873 68.879 66.6356 69.7783 65.7357C70.6737 64.8358 71.8199 64.3859 73.2166 64.3859C74.6134 64.3859 75.7422 64.8358 76.6511 65.7357C77.5523 66.6356 78 67.7931 78 69.1929C78 70.5928 77.5523 71.758 76.6511 72.6502C75.7499 73.5501 74.6057 74 73.2166 74Z"
          fill={`url(#${idGradient})`}
        />
        <path
          d="M73.2166 72.9386C74.2785 72.9386 75.1587 72.5886 75.8417 71.8849C76.5267 71.1888 76.8673 70.2813 76.8673 69.1872C76.8673 68.0931 76.5267 67.1932 75.8417 66.4894C75.1491 65.7934 74.2766 65.4415 73.2166 65.4415C72.1566 65.4415 71.2745 65.7857 70.5991 66.4894C69.9141 67.1855 69.564 68.0892 69.564 69.1872C69.564 70.2851 69.9065 71.1811 70.5991 71.8849C71.2841 72.581 72.1566 72.9386 73.2166 72.9386Z"
          fill={`url(#${idGradient})`}
        />
        <path
          d="M71.42 71.6676V66.651H73.5514C74.1082 66.651 74.5483 66.799 74.8697 67.1009C75.1931 67.4105 75.3538 67.8123 75.3538 68.3219C75.3538 69.0891 74.8984 69.664 74.1522 69.8621L75.4151 71.6618H74.1522L72.9564 69.9255H72.5584V71.6618H71.418V71.6676H71.42ZM72.5603 68.991H73.5017C74.026 68.991 74.2862 68.7661 74.2862 68.3238C74.2862 67.8816 74.0183 67.6566 73.4902 67.6566H72.5622V68.991H72.5603Z"
          fill={`url(#${idGradient})`}
        />
      </g>

      <defs>
        <linearGradient
          id={idGradient}
          x1="0"
          y1="37"
          x2="78"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>

        <clipPath id={clipId}>
          <rect width="78" height="74" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const KapitalIcon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 24, colors = ["#000", "#000"], ...props }) => {
  const idGradient = useId();
  const clipId = useId();
  return (
    <svg
      width={size}
      height={(size * 74) / 78}
      viewBox="0 0 78 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M63.7704 11.137H52.9619L40.8905 32.4304C39.2852 35.2627 39.2852 38.7353 40.8905 41.5677L52.9619 62.861H63.7704L51.6991 41.5677C50.0937 38.7353 50.0937 35.2627 51.6991 32.4304L63.7704 11.137Z"
          fill={`url(#${idGradient})`}
        />
        <path
          d="M0 25.862L5.40524 35.2685L29.791 35.1281C33.0341 35.1089 36.0266 33.3726 37.6645 30.5595L49.9788 9.40647L44.5736 0L32.2592 21.153C30.6214 23.9661 27.6289 25.7024 24.3858 25.7217L0 25.862Z"
          fill={`url(#${idGradient})`}
        />
        <path
          d="M44.5736 74L49.9788 64.5935L37.6645 43.4405C36.0266 40.6274 33.0341 38.8911 29.791 38.8719L5.40524 38.7315L0 48.138L24.3858 48.2783C27.6289 48.2976 30.6214 50.0339 32.2592 52.847L44.5736 74Z"
          fill={`url(#${idGradient})`}
        />
      </g>

      <defs>
        <linearGradient
          id={idGradient}
          x1="0"
          y1="37"
          x2="78"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>

        <clipPath id={clipId}>
          <rect width="78" height="74" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const AddCardV2Icon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 24, colors = ["#000", "#000"], ...props }) => {
  const idGradient = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.0001 22.8267C16.0001 26.5081 18.9854 29.4934 22.6667 29.4934C26.3494 29.4934 29.3334 26.5081 29.3334 22.8267C29.3334 19.1454 26.3494 16.1601 22.6667 16.1601C18.9854 16.1601 16.0001 19.1454 16.0001 22.8267ZM16.0001 22.8267H5.33341C3.86008 22.8267 2.66675 21.6334 2.66675 20.1601V8.16007C2.66675 6.68674 3.86008 5.49341 5.33341 5.49341H25.3334C26.8067 5.49341 28.0001 6.68674 28.0001 8.16007V18.8267M2.66675 10.6267H28.0001M22.6667 20.1601V25.4934M25.3334 22.8267H20.0001"
        stroke={`url(#${idGradient})`}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient
          id={idGradient}
          x1="2.66675"
          y1="16"
          x2="29.3334"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const BackArrowV2Icon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 24, colors = ["#000", "#000"], ...props }) => {
  const idGradient = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 21L8 12L16 3"
        stroke={`url(#${idGradient})`}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient
          id={idGradient}
          x1="8"
          y1="12"
          x2="16"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const BankV2Icon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 24, colors = ["#000", "#000"], ...props }) => {
  const idGradient = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.9776 9.63158V17.2105M19.1053 17.2105V9.63158M13.4211 20.0526H21V19.1053L20.0526 17.2105H11.5263M9.28295 21H3.44905C3.20105 21 3 20.799 3 20.5509V20.1872C3.0026 19.1502 3.8426 18.3102 4.87958 18.3076H7.85147C8.88846 18.3102 9.72845 19.1502 9.73105 20.1872V20.5509C9.73105 20.7986 9.53058 20.9995 9.28295 21ZM6.366 16.0633C5.37515 16.0614 4.57314 15.2572 4.57405 14.2663C4.57497 13.2755 5.37847 12.4727 6.36932 12.4727C7.36016 12.4727 8.16366 13.2755 8.16458 14.2663C8.16549 15.2572 7.36348 16.0614 6.37263 16.0633H6.366ZM3.94737 9.63158H21V6.72126L12.4737 3L3.94737 6.72126V9.63158Z"
        stroke={`url(#${idGradient})`}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient
          id={idGradient}
          x1="3"
          y1="12"
          x2="21"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const ExchangeV2Icon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 24, colors = ["#000", "#000"], ...props }) => {
  const idGradient = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.75073 14.25V3.75"
        stroke={`url(#${idGradient})`}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75148 14.2498L3.00073 10.499"
        stroke={`url(#${idGradient})`}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5007 3.75V14.25"
        stroke={`url(#${idGradient})`}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2515 7.50098L11.5007 3.75023"
        stroke={`url(#${idGradient})`}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient
          id={idGradient}
          x1="0"
          y1="9"
          x2="18"
          y2="9"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const SupportV2Icon: React.FC<
  SVGProps<SVGSVGElement> & {
    size?: number;
    colors?: [string, string];
  }
> = ({ size = 24, colors = ["#000", "#000"], ...props }) => {
  const idGradient = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3.00014 13.0542 3.18764 14.1 3.55376 15.0886C3.7212 15.5477 4.19327 15.8212 4.67486 15.738L5.66105 15.5641C6.45812 15.4236 6.99996 14.676 6.8855 13.8748L6.58868 11.7971C6.53121 11.3948 6.31303 11.0331 5.98405 10.7947C5.65507 10.5562 5.24343 10.4614 4.84329 10.532L3.0827 10.8424M21 12C20.9999 13.0542 20.8124 14.1 20.4462 15.0886C20.2788 15.5477 19.8067 15.8212 19.3251 15.738L18.339 15.5641C17.5419 15.4236 17 14.676 17.1145 13.8748L17.4113 11.7971C17.4688 11.3948 17.687 11.0331 18.016 10.7947C18.3449 10.5562 18.7566 10.4614 19.1567 10.532L20.9173 10.8424M13.4916 12.498L13.4926 12.499L13.4936 12.498M10.5065 12.501L10.5075 12.502L10.5085 12.501"
        stroke={`url(#${idGradient})`}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient
          id={idGradient}
          x1="0"
          y1="12"
          x2="24"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};
