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
  const gradientId1 = "cameraGradient1";
  const gradientId2 = "cameraGradient2";
  const gradientId3 = "cameraGradient3";

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
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>

      <circle cx="256" cy="256" r="256" fill="url(#grad)" />

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
          id="gradGlobal"
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
        fill="url(#gradGlobal)"
      />
      <path
        d="M142.535 14C154.055 14 163.419 23.139 163.419 34.4189V107.634C163.419 118.914 154.055 128.053 142.535 128.053C131.015 128.053 121.651 118.914 121.651 107.634V34.4189C121.651 23.139 131.015 14 142.535 14Z"
        fill="url(#gradGlobal)"
      />
      <path
        d="M44.8838 32.6436C56.4039 32.6437 65.7666 41.7826 65.7666 53.0625V107.582C65.7666 118.862 56.4039 128.001 44.8838 128.001C33.3635 128.001 24 118.862 24 107.582V53.0625C24 41.7825 33.3145 32.6436 44.8838 32.6436Z"
        fill="url(#gradGlobal)"
      />
      <path
        d="M191.117 86.0654C202.637 86.0656 212 95.2562 212 106.536V121.42C212 125.075 209.01 127.999 205.284 127.999H191.117C179.597 127.999 170.234 118.861 170.233 107.581V106.484C170.233 95.2044 179.597 86.0654 191.117 86.0654Z"
        fill="url(#gradGlobal)"
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
      </defs>

      <circle cx="32" cy="32" r="32" fill={`url(#${gradientId})`} />
      <path
        d="M46.2413 21.3287L26.6858 42.6621L17.7969 32.9651"
        stroke="white"
        strokeWidth="3.55556"
        strokeLinecap="round"
        strokeLinejoin="round"
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
