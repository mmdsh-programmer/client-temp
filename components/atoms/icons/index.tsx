interface IProps {
  className?: string;
  fill?: string;
  stroke?: string;
}

export const AddIcon = (props: IProps) => {
  const { className, fill, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12H12M12 12H18M12 12V18M12 12V6"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AddImageIcon = (props: IProps) => {
  const { className, fill } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.0038 13.5005V17.5022C21.0038 19.7122 19.2122 21.5038 17.0022 21.5038H6.998C4.78795 21.5038 2.99634 19.7122 2.99634 17.5022V7.498C2.99634 5.28795 4.78795 3.49634 6.998 3.49634H10.9997"
        stroke="#9AA6B1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="18.0026"
        cy="6.49752"
        r="4.00167"
        stroke="#9AA6B1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2532 6.49752H16.7522"
        stroke="#9AA6B1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0026 5.24707V7.74811"
        stroke="#9AA6B1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.99634 13.5019L4.29204 12.2062C4.74438 11.7539 5.35788 11.4998 5.99759 11.4998C6.63729 11.4998 7.25079 11.7539 7.70313 12.2062L12.0001 16.5032"
        stroke="#9AA6B1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.00244 21.5039L13.2989 15.2074C14.2408 14.2655 15.768 14.2655 16.71 15.2074L20.6508 19.1482"
        stroke="#9AA6B1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AlertIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.00115 18.0039C8.01697 18.0039 8.8481 17.1728 8.8481 16.157H5.15419C5.15419 17.1728 5.97609 18.0039 7.00115 18.0039ZM12.5419 12.463V7.84565C12.5419 5.01058 11.0274 2.63724 8.38628 2.00927V1.38131C8.38628 0.614824 7.76755 -0.00390625 7.00106 -0.00390625C6.23457 -0.00390625 5.61584 0.614824 5.61584 1.38131V2.00927C2.96546 2.63724 1.46019 5.00134 1.46019 7.84565V12.463L0.268907 13.6543C-0.312884 14.2361 0.0934465 15.2335 0.915341 15.2335H13.0775C13.8994 15.2335 14.315 14.2361 13.7332 13.6543L12.5419 12.463Z"
        fill="#A2A2A9"
      />
    </svg>
  );
};

export const ArchiveIcon = (props: IProps) => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 21H5C3.895 21 3 20.105 3 19V5C3 3.895 3.895 3 5 3H19C20.105 3 21 3.895 21 5V19C21 20.105 20.105 21 19 21Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 15H7.382C7.761 15 8.107 15.214 8.276 15.553L8.723 16.447C8.893 16.786 9.239 17 9.618 17H14.382C14.761 17 15.107 16.786 15.276 16.447L15.723 15.553C15.893 15.214 16.239 15 16.618 15H21"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 7H17"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11H17"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowDownIcon = (props: IProps) => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.0049 7.41675H9.79232H5.99897C5.34984 7.41675 5.02528 8.20111 5.48508 8.66091L8.98767 12.1635C9.5489 12.7247 10.4617 12.7247 11.023 12.1635L12.355 10.8314L14.5256 8.66091C14.9786 8.20111 14.654 7.41675 14.0049 7.41675Z"
        fill="white"
      />
    </svg>
  );
};

export const ArrowRightIcon = (props: IProps) => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-6.11959e-07 9.5L12.17 9.5L6.58 15.09L8 16.5L16 8.5L8 0.500001L6.59 1.91L12.17 7.5L-7.86805e-07 7.5L-6.11959e-07 9.5Z"
        fill="#181C20"
      />
    </svg>
  );
};

export const BackIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6161 17.9216C12.7379 17.9713 12.8684 17.9965 13 17.9958C13.1316 17.9965 13.2621 17.9713 13.3839 17.9216C13.5057 17.8718 13.6166 17.7985 13.71 17.7058L18.71 12.7058C18.8962 12.5184 19.0008 12.265 19.0008 12.0008C19.0008 11.7366 18.8962 11.4831 18.71 11.2958L13.71 6.29578C13.617 6.20205 13.5064 6.12767 13.3846 6.0769C13.2627 6.02614 13.132 6 13 6C12.868 6 12.7373 6.02614 12.6154 6.0769C12.4936 6.12767 12.383 6.20205 12.29 6.29578C12.1037 6.48314 11.9992 6.73661 11.9992 7.00079C11.9992 7.26498 12.1037 7.51845 12.29 7.70581L15.5877 10.9958H6C5.73478 10.9958 5.48043 11.1012 5.29289 11.2887C5.10536 11.4762 5 11.7306 5 11.9958C5 12.261 5.10536 12.5153 5.29289 12.7029C5.48043 12.8904 5.73478 12.9958 6 12.9958H15.59L12.29 16.2958C12.1037 16.4831 11.9992 16.7366 11.9992 17.0008C11.9992 17.265 12.1037 17.5184 12.29 17.7058C12.3834 17.7985 12.4943 17.8718 12.6161 17.9216Z"
        fill="currentColor;"
      />
    </svg>
  );
};

export const BreadcrumbIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1654 16.1668C14.1654 16.443 13.9415 16.6668 13.6654 16.6668H11.332C11.0559 16.6668 10.832 16.443 10.832 16.1668V13.8335C10.832 13.5574 11.0559 13.3335 11.332 13.3335H13.6654C13.9415 13.3335 14.1654 13.5574 14.1654 13.8335V16.1668ZM9.16536 16.1668C9.16536 16.443 8.94151 16.6668 8.66536 16.6668H6.33203C6.05589 16.6668 5.83203 16.443 5.83203 16.1668V13.8335C5.83203 13.5574 6.05589 13.3335 6.33203 13.3335H8.66536C8.94151 13.3335 9.16536 13.5574 9.16536 13.8335V16.1668ZM14.1654 11.1668C14.1654 11.443 13.9415 11.6668 13.6654 11.6668H11.332C11.0559 11.6668 10.832 11.443 10.832 11.1668V8.8335C10.832 8.55735 11.0559 8.3335 11.332 8.3335H13.6654C13.9415 8.3335 14.1654 8.55735 14.1654 8.8335V11.1668ZM9.16536 11.1668C9.16536 11.443 8.94151 11.6668 8.66536 11.6668H6.33203C6.05589 11.6668 5.83203 11.443 5.83203 11.1668V8.8335C5.83203 8.55735 6.05589 8.3335 6.33203 8.3335H8.66536C8.94151 8.3335 9.16536 8.55735 9.16536 8.8335V11.1668ZM14.1654 6.16683C14.1654 6.44297 13.9415 6.66683 13.6654 6.66683H11.332C11.0559 6.66683 10.832 6.44297 10.832 6.16683V3.8335C10.832 3.55735 11.0559 3.3335 11.332 3.3335H13.6654C13.9415 3.3335 14.1654 3.55735 14.1654 3.8335V6.16683ZM9.16536 6.16683C9.16536 6.44297 8.94151 6.66683 8.66536 6.66683H6.33203C6.05589 6.66683 5.83203 6.44297 5.83203 6.16683V3.8335C5.83203 3.55735 6.05589 3.3335 6.33203 3.3335H8.66536C8.94151 3.3335 9.16536 3.55735 9.16536 3.8335V6.16683Z"
        fill="#667585"
      />
    </svg>
  );
};

export const CancelIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.4999 17.4999L12 12M12 12L6.5 6.5M12 12L17.5 6.5M12 12L6.5 17.5"
        stroke="#1B1B1D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CardIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 1H1V6H6V1Z"
        stroke="#0C0E10"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M15 1H10V6H15V1Z"
        stroke="#0C0E10"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 10H1V15H6V10Z"
        stroke="#0C0E10"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M15 10H10V15H15V10Z"
        stroke="#0C0E10"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ChevronLeftIcon = (props: IProps) => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 11L1 6L6 1"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ClasorLogo = (props: IProps) => {
  const { className, fill = "#673AB7" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill={fill}
      viewBox="0 0 153.12 153.14"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            d="M102.7,98.9V97.6H96.55a20.89,20.89,0,0,1-14.47-5.82H6.91L18,102.9H98.7A4,4,0,0,0,102.7,98.9Z"
            fill={fill}
          />
          <path
            d="M78,62.31l3.16.07A21,21,0,0,1,96.55,55.6h6.15V54.44a4,4,0,0,0-4-4h-26A6,6,0,0,1,68.44,40.2l28.3-28.3-6-6a20,20,0,0,0-28.28,0L21.19,47.07C51.72,61.48,77.64,62.3,78,62.31Z"
            fill={fill}
          />
          <path
            d="M70.84,71.79A172.39,172.39,0,0,1,13.67,54.6L5.84,62.43l-.11.12A348.88,348.88,0,0,0,70.84,71.79Z"
            fill={fill}
          />
          <path
            d="M147.26,62.43,124.05,39.22a20,20,0,0,1-4.44-21.54l5.93-14.9a1,1,0,0,0-1.63-1.07L87.17,38.44H98.7a16,16,0,0,1,16,16V98.9a16,16,0,0,1-16,16H30l32.38,32.38a20,20,0,0,0,28.28,0l56.57-56.57A20,20,0,0,0,147.26,62.43Z"
            fill={fill}
          />
          <path d="M102.7,63.6H96.55a13,13,0,0,0,0,26h6.15Z" fill={fill} />
          <path
            d="M.69,81.78H70A351.89,351.89,0,0,1,.63,71.6,20,20,0,0,0,.69,81.78Z"
            fill={fill}
          />
        </g>
      </g>
    </svg>
  );
};

export const DashboardIcon = (props: IProps) => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V7"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 14H21"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 14H5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4142 11.5858C14.1952 12.3669 14.1952 13.6332 13.4142 14.4142C12.6332 15.1953 11.3668 15.1953 10.5858 14.4142C9.80472 13.6332 9.80472 12.3669 10.5858 11.5858C11.3668 10.8048 12.6332 10.8048 13.4142 11.5858"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5V7"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14H19"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 14H3"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.41 9.59L13.41 11.59"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4142 11.5858C14.1952 12.3669 14.1952 13.6332 13.4142 14.4142C12.6332 15.1953 11.3668 15.1953 10.5858 14.4142C9.80472 13.6332 9.80472 12.3669 10.5858 11.5858C11.3668 10.8048 12.6332 10.8048 13.4142 11.5858"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.319 19H5.679C4.929 19 4.223 18.591 3.897 17.916C3.181 16.438 2.856 14.734 3.062 12.94C3.532 8.834 6.879 5.504 10.987 5.055C16.411 4.463 21 8.695 21 14C21 15.399 20.68 16.723 20.11 17.903C19.782 18.584 19.074 19 18.319 19V19Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DashedLineIcon = (props: IProps) => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 277 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 1L277 1" stroke={stroke} strokeDasharray="5 5" />
    </svg>
  );
};

export const DeleteIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.74748 8.99875C6.74748 8.58454 6.4117 8.24875 5.99748 8.24875C5.58327 8.24875 5.24748 8.58454 5.24748 8.99875H6.74748ZM18.7525 8.99875C18.7525 8.58454 18.4167 8.24875 18.0025 8.24875C17.5883 8.24875 17.2525 8.58454 17.2525 8.99875H18.7525ZM14.7508 9.99917C14.7508 9.58495 14.415 9.24917 14.0008 9.24917C13.5866 9.24917 13.2508 9.58495 13.2508 9.99917H14.7508ZM13.2508 17.0021C13.2508 17.4163 13.5866 17.7521 14.0008 17.7521C14.415 17.7521 14.7508 17.4163 14.7508 17.0021H13.2508ZM10.7491 9.99917C10.7491 9.58495 10.4134 9.24917 9.99915 9.24917C9.58493 9.24917 9.24915 9.58495 9.24915 9.99917H10.7491ZM9.24915 17.0021C9.24915 17.4163 9.58493 17.7521 9.99915 17.7521C10.4134 17.7521 10.7491 17.4163 10.7491 17.0021H9.24915ZM4.49686 5.2475C4.08264 5.2475 3.74686 5.58329 3.74686 5.9975C3.74686 6.41171 4.08264 6.7475 4.49686 6.7475V5.2475ZM19.5031 6.7475C19.9173 6.7475 20.2531 6.41171 20.2531 5.9975C20.2531 5.58329 19.9173 5.2475 19.5031 5.2475V6.7475ZM7.2868 5.76033C7.15582 6.15328 7.36819 6.57802 7.76114 6.70901C8.1541 6.84 8.57884 6.62763 8.70983 6.23467L7.2868 5.76033ZM8.54254 4.36482L9.25405 4.60199L9.25411 4.60182L8.54254 4.36482ZM10.4413 2.99625L10.4412 3.74625H10.4413V2.99625ZM13.5586 2.99625V3.74625L13.5596 3.74625L13.5586 2.99625ZM15.4594 4.36482L16.1712 4.12843L16.171 4.12782L15.4594 4.36482ZM15.2899 6.23388C15.4204 6.62699 15.8449 6.83982 16.238 6.70927C16.6311 6.57872 16.844 6.15421 16.7134 5.76111L15.2899 6.23388ZM5.24748 8.99875V19.0029H6.74748V8.99875H5.24748ZM5.24748 19.0029C5.24748 20.5222 6.47907 21.7537 7.99831 21.7537V20.2537C7.3075 20.2537 6.74748 19.6937 6.74748 19.0029H5.24748ZM7.99831 21.7537H16.0016V20.2537H7.99831V21.7537ZM16.0016 21.7537C17.5209 21.7537 18.7525 20.5222 18.7525 19.0029H17.2525C17.2525 19.6937 16.6925 20.2537 16.0016 20.2537V21.7537ZM18.7525 19.0029V8.99875H17.2525V19.0029H18.7525ZM13.2508 9.99917V17.0021H14.7508V9.99917H13.2508ZM9.24915 9.99917V17.0021H10.7491V9.99917H9.24915ZM4.49686 6.7475H19.5031V5.2475H4.49686V6.7475ZM8.70983 6.23467L9.25405 4.60199L7.83103 4.12765L7.2868 5.76033L8.70983 6.23467ZM9.25411 4.60182C9.42431 4.0908 9.90253 3.74612 10.4412 3.74625L10.4415 2.24625C9.25698 2.24596 8.20528 3.00399 7.83097 4.12782L9.25411 4.60182ZM10.4413 3.74625H13.5586V2.24625H10.4413V3.74625ZM13.5596 3.74625C14.0986 3.74558 14.5775 4.09036 14.7479 4.60182L16.171 4.12782C15.7964 3.00303 14.7432 2.24478 13.5577 2.24625L13.5596 3.74625ZM14.7476 4.60121L15.2899 6.23388L16.7134 5.76111L16.1712 4.12843L14.7476 4.60121Z"
        fill="#1B1B1D"
      />
    </svg>
  );
};

export const CopyIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.8333 17.4999H5.66666V5.83325H14.8333V17.4999ZM14.8333 4.16659H5.66666C5.22463 4.16659 4.80071 4.34218 4.48815 4.65474C4.17558 4.9673 3.99999 5.39122 3.99999 5.83325V17.4999C3.99999 17.9419 4.17558 18.3659 4.48815 18.6784C4.80071 18.991 5.22463 19.1666 5.66666 19.1666H14.8333C15.2754 19.1666 15.6993 18.991 16.0118 18.6784C16.3244 18.3659 16.5 17.9419 16.5 17.4999V5.83325C16.5 5.39122 16.3244 4.9673 16.0118 4.65474C15.6993 4.34218 15.2754 4.16659 14.8333 4.16659V4.16659ZM12.3333 0.833252H2.33332C1.8913 0.833252 1.46737 1.00885 1.15481 1.32141C0.842251 1.63397 0.666656 2.05789 0.666656 2.49992V14.1666H2.33332V2.49992H12.3333V0.833252Z" />
    </svg>
  );
};

export const DocIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V7.83002C19.9993 7.03464 19.6828 6.27209 19.12 5.71002L16.29 2.88C15.7279 2.31723 14.9654 2.0007 14.17 2H7C6.20435 2 5.44127 2.31608 4.87866 2.87869C4.31605 3.4413 4 4.20435 4 5V19C4 19.7956 4.31605 20.5587 4.87866 21.1213C5.44127 21.6839 6.20435 22 7 22ZM6.29291 4.29291C6.48044 4.10537 6.73478 4 7 4H14.17C14.3023 4.00055 14.4332 4.02736 14.5551 4.07886C14.6769 4.13035 14.7874 4.20553 14.88 4.30002L15 4.42001V6C15 6.26522 15.1054 6.51959 15.2929 6.70712C15.4804 6.89466 15.7348 7 16 7H17.58L17.71 7.13C17.8948 7.31627 17.9989 7.56768 18 7.83002V19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8947 17.2652 20 17 20H7C6.73478 20 6.48044 19.8947 6.29291 19.7071C6.10537 19.5196 6 19.2652 6 19V5C6 4.73478 6.10537 4.48044 6.29291 4.29291ZM15 12H9C8.73478 12 8.48044 11.8947 8.29291 11.7071C8.10537 11.5196 8 11.2652 8 11C8 10.7348 8.10537 10.4804 8.29291 10.2929C8.48044 10.1054 8.73478 10 9 10H15C15.2652 10 15.5196 10.1054 15.7071 10.2929C15.8946 10.4804 16 10.7348 16 11C16 11.2652 15.8946 11.5196 15.7071 11.7071C15.5196 11.8947 15.2652 12 15 12ZM11 16H15C15.2652 16 15.5196 15.8947 15.7071 15.7071C15.8946 15.5196 16 15.2652 16 15C16 14.7348 15.8946 14.4804 15.7071 14.2929C15.5196 14.1054 15.2652 14 15 14H11C10.7348 14 10.4804 14.1054 10.2929 14.2929C10.1054 14.4804 10 14.7348 10 15C10 15.2652 10.1054 15.5196 10.2929 15.7071C10.4804 15.8947 10.7348 16 11 16Z"
        fill="currentColor;"
      />
    </svg>
  );
};

export const DocumentEditIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9109 12.5093L18.8859 6.53431C19.5983 5.82191 20.7533 5.82191 21.4657 6.53431V6.53431C22.1781 7.24672 22.1781 8.40175 21.4657 9.11416L15.4907 15.0892C15.1082 15.4716 14.612 15.7198 14.0765 15.7963L12.6942 15.9937C12.5048 16.0208 12.3136 15.9571 12.1782 15.8217C12.0429 15.6864 11.9792 15.4952 12.0062 15.3057L12.2037 13.9235C12.2802 13.388 12.5284 12.8918 12.9109 12.5093V12.5093Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 16H7"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.5H7"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9H7"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 6.42983V5C19 3.89543 18.1046 3 17 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H17C18.1046 21 19 20.1046 19 19V11.5798"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EditIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.99875 15.0013L12.1501 14.6121C12.3715 14.585 12.5775 14.4846 12.7353 14.327L20.3695 6.69779C21.2148 5.85204 21.2148 4.48127 20.3695 3.63552V3.63552C19.5237 2.7902 18.153 2.7902 17.3072 3.63552L9.74406 11.1987C9.59088 11.3518 9.49153 11.5505 9.46094 11.7649L8.99875 15.0013Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0004 3.99667H6.99791C4.78785 3.99667 2.99625 5.78827 2.99625 7.99833V17.0021C2.99625 19.2121 4.78785 21.0037 6.99791 21.0037H16.0017C18.2117 21.0037 20.0033 19.2121 20.0033 17.0021V10.9996"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FaqIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.68469 9.68471C9.92172 8.66315 10.8522 7.95485 11.8999 7.99833C13.0726 7.93338 14.0779 8.82698 14.1509 9.99917C14.1509 11.5037 12 12 12 13.0004"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1252 15.7517C12.1251 15.8207 12.0691 15.8766 12.0001 15.8766C11.9311 15.8766 11.8751 15.8206 11.8751 15.7516C11.8751 15.6826 11.931 15.6266 12 15.6265C12.0332 15.6265 12.0651 15.6396 12.0886 15.6631C12.1121 15.6866 12.1252 15.7185 12.1252 15.7517"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.6284 17.1604C1.9453 13.3307 2.63481 8.08536 6.21651 5.07915C9.79821 2.07295 15.0836 2.30337 18.3901 5.60986C21.6966 8.91636 21.927 14.2018 18.9208 17.7835C15.9146 21.3652 10.6693 22.0547 6.83959 19.3716L3.99667 20.0033L4.6284 17.1604Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FileAccessIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7085 17.0862L13.1231 16.5007C12.8578 16.2354 12.4981 16.0864 12.123 16.0864C11.7478 16.0864 11.3881 16.2354 11.1228 16.5007V16.5007C10.6461 16.9774 10.5721 17.7243 10.9461 18.2852L12.8861 21.1957C13.257 21.7522 13.8816 22.0864 14.5503 22.0864H18.3464C19.3551 22.0864 20.2059 21.3353 20.331 20.3344L20.693 17.4376C20.8263 16.3704 20.0918 15.3888 19.0303 15.2157L16.7085 14.8371V12.5864C16.7085 11.758 16.037 11.0864 15.2085 11.0864V11.0864C14.3801 11.0864 13.7085 11.758 13.7085 12.5864V17.0862Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 10V7.828C19 7.298 18.789 6.789 18.414 6.414L15.586 3.586C15.211 3.211 14.702 3 14.172 3H7C5.895 3 5 3.895 5 5V19C5 20.105 5.895 21 7 21H9"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 8H15C14.448 8 14 7.552 14 7V3"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FileConfirmIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12.981V7.828C19 7.298 18.789 6.789 18.414 6.414L15.586 3.586C15.211 3.211 14.702 3 14.172 3H7C5.895 3 5 3.895 5 5V19C5 20.105 5.895 21 7 21H14.868"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 8H15C14.448 8 14 7.552 14 7V3"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.556 16.223L16.611 18.168L15.444 17.001"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.275 17.814L12.939 18.683L13.083 19.764C13.163 20.364 13.634 20.836 14.234 20.916L15.318 21.061L16.186 21.725C16.666 22.092 17.333 22.092 17.813 21.725L18.682 21.061H18.681L19.763 20.917C20.363 20.837 20.835 20.366 20.915 19.766L21.06 18.682C21.06 18.683 21.396 18.243 21.724 17.814C22.091 17.334 22.091 16.667 21.724 16.187L21.06 15.318L20.916 14.237C20.836 13.637 20.365 13.165 19.765 13.085L18.681 12.94L17.813 12.276C17.333 11.909 16.666 11.909 16.186 12.276L15.317 12.94H15.318L14.236 13.084C13.636 13.164 13.164 13.635 13.084 14.235L12.939 15.319C12.939 15.318 12.603 15.758 12.275 16.187C11.908 16.667 11.908 17.333 12.275 17.814V17.814Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FilePreviewIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 11V7.828C19 7.298 18.789 6.789 18.414 6.414L15.586 3.586C15.211 3.211 14.702 3 14.172 3H7C5.895 3 5 3.895 5 5V19C5 20.105 5.895 21 7 21H11"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 8H15C14.448 8 14 7.552 14 7V3"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.561 18.306C13.241 17.821 13.241 17.181 13.561 16.696C14.551 15.199 16.105 14 17.66 14C19.215 14 20.768 15.199 21.759 16.695C22.08 17.18 22.08 17.821 21.759 18.305C20.767 19.801 19.214 21 17.66 21C16.105 21.001 14.551 19.802 13.561 18.306Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.776 17.384C17.841 17.449 17.841 17.553 17.776 17.618C17.711 17.683 17.607 17.683 17.542 17.618C17.477 17.553 17.477 17.449 17.542 17.384C17.607 17.319 17.712 17.319 17.776 17.384"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FilePublicIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 21C7 18.7909 5.20914 17 3 17C5.20914 17 7 15.2091 7 13C7 15.2091 8.79086 17 11 17C8.79086 17 7 18.7909 7 21Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 21H17.5C18.8807 21 20 19.8807 20 18.5V8.37167C20 7.57602 19.6839 6.81296 19.1213 6.25035L16.7497 3.87868C16.187 3.31607 15.424 3 14.6283 3H7.5C6.11929 3 5 4.11929 5 5.5V9"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.9764 8H16.5C15.6716 8 15 7.32843 15 6.5V3.02362"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FileRenameIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 21H17.5C18.8807 21 20 19.8807 20 18.5V8.37167C20 7.57602 19.6839 6.81296 19.1213 6.25035L16.7497 3.87868C16.187 3.31607 15.424 3 14.6283 3H7.5C6.11929 3 5 4.11929 5 5.5V13"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.9764 8H16.5C15.6716 8 15 7.32843 15 6.5V3.02362"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2929 14.3344L13.3344 11.2929C13.5219 11.1054 13.7763 11 14.0415 11C14.3067 11 14.5611 11.1054 14.7486 11.2929L15.7071 12.2514C16.0976 12.6419 16.0976 13.2751 15.7071 13.6656L12.6656 16.7071C12.4781 16.8946 12.2237 17 11.9585 17H10.5C10.2239 17 10 16.7761 10 16.5V15.0415C10 14.7763 10.1054 14.5219 10.2929 14.3344Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.09999 17.0001C7.09995 17.0277 7.07757 17.05 7.04997 17.05C7.02237 17.05 7 17.0276 6.99999 17C6.99998 16.9724 7.02233 16.95 7.04993 16.95C7.06321 16.95 7.07595 16.9553 7.08534 16.9646C7.09473 16.974 7.1 16.9868 7.09999 17.0001"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.09999 17.0001C4.09995 17.0277 4.07757 17.05 4.04997 17.05C4.02237 17.05 4 17.0276 3.99999 17C3.99998 16.9724 4.02233 16.95 4.04993 16.95C4.06321 16.95 4.07595 16.9553 4.08534 16.9646C4.09473 16.974 4.1 16.9868 4.09999 17.0001"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FileTransformIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 14H11"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 16.5V14"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 14L8 17"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 17H18C19.1046 17 20 16.1046 20 15V7.0172C20 6.43704 19.7695 5.88065 19.3593 5.47041L17.5296 3.6407C17.1194 3.23047 16.563 3 15.9828 3H10C8.89543 3 8 3.89543 8 5V11"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 7.5H17C16.1716 7.5 15.5 6.82843 15.5 6V3"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 17V19C17.0001 19.5305 16.7895 20.0393 16.4144 20.4144C16.0393 20.7895 15.5305 21.0001 15 21H6C5.46952 21.0001 4.96073 20.7895 4.58563 20.4144C4.21052 20.0393 3.99985 19.5305 4 19V8C3.99985 7.46952 4.21052 6.96073 4.58563 6.58563C4.96073 6.21052 5.46952 5.99985 6 6H8"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FillArrow = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 9 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 4.77345L4.5 0L9 4.77345H0Z" />
    </svg>
  );
};

export const FilterIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.79267 19.622V17.4147H14.2073V19.622H9.79267ZM5.37801 14.1037V11.8963H18.622V14.1037H5.37801ZM2.06702 8.58534V6.37801H21.933V8.58534H2.06702Z"
        fill="#1B1B1D"
      />
    </svg>
  );
};

export const FolderArchiveIcon = (props: IProps) => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="12"
        width="20"
        height="9"
        rx="2"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 15H14"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12V7.45C20 6.34543 19.1046 5.45 18 5.45H13.0291C12.6981 5.45 12.3886 5.2862 12.2024 5.01253L11.1307 3.43747C10.9445 3.1638 10.6349 3 10.3039 3H6C4.89543 3 4 3.89543 4 5V12"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FolderBookmarkIcon = (props: IProps) => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 20H19C19.5305 20.0001 20.0393 19.7895 20.4144 19.4144C20.7895 19.0393 21.0001 18.5305 21 18V8.94C21 7.83545 20.1045 6.94005 19 6.94H12.529C12.1978 6.93999 11.8881 6.77596 11.702 6.502L10.297 4.437C10.1109 4.16368 9.80166 4.00008 9.471 4H5C4.46952 3.99985 3.96073 4.21052 3.58563 4.58563C3.21052 4.96073 2.99985 5.46952 3 6L3 8.94"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.38174 19.9161C4.13351 20.0457 3.83321 20.0229 3.6074 19.8573C3.38159 19.6917 3.26956 19.4122 3.31851 19.1365L3.71472 16.8655L2.04665 15.267C1.84276 15.0726 1.76804 14.7786 1.85431 14.5104C1.94058 14.2422 2.17265 14.047 2.45167 14.0079L4.76766 13.6768L5.81326 11.591C5.93723 11.3408 6.19229 11.1826 6.47147 11.1826C6.75066 11.1826 7.00571 11.3408 7.12969 11.591L8.17529 13.6768L10.4913 14.0079C10.7703 14.047 11.0024 14.2422 11.0886 14.5104C11.1749 14.7786 11.1002 15.0726 10.8963 15.267L9.22823 16.8655L9.62443 19.1369C9.67339 19.4126 9.56136 19.6922 9.33555 19.8578C9.10974 20.0234 8.80944 20.0462 8.5612 19.9166L6.47147 18.8367L4.38174 19.9161Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FolderEmptyIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      width="200"
      height="150"
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2129_98472)">
        <mask
          id="mask0_2129_98472"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="200"
          height="150"
        >
          <path d="M200 0H0V150H200V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_2129_98472)">
          <g filter="url(#filter0_f_2129_98472)">
            <path
              d="M156.313 72.3626C156.313 88.3124 149.751 102.737 139.163 113.05H59.7008C49.1258 102.725 42.5508 88.3124 42.5508 72.3626C42.5633 40.9626 68.0383 15.4875 99.4382 15.4875C130.838 15.4875 156.313 40.9626 156.313 72.3626Z"
              fill="url(#paint0_linear_2129_98472)"
            />
          </g>
          <path
            d="M162.787 74.3499H157.987C156.987 71.7874 154.512 69.9749 151.587 69.9749C149.2 69.9749 147.1 71.1874 145.887 73.0499C145.862 73.0499 145.837 73.0374 145.812 73.0249C145.362 72.9124 144.887 72.8374 144.4 72.8374C143.012 72.8374 141.75 73.3499 140.787 74.1999C140.762 74.1999 140.75 74.2249 140.737 74.2374C140.15 74.7624 139.688 75.4124 139.363 76.1499C139.35 76.1874 139.337 76.2249 139.325 76.2624H139.212C136.575 76.2624 134.438 78.3999 134.438 81.0374H169.512C169.512 77.3373 166.525 74.3499 162.825 74.3499H162.787Z"
            fill="white"
          />
          <path
            d="M187.5 105.012H12.5V140.012H187.5V105.012Z"
            fill="url(#paint1_radial_2129_98472)"
          />
          <path
            d="M70.6875 22.475H70.8375C71.675 17.525 75.9875 13.75 81.175 13.75C84.925 13.75 88.225 15.7125 90.075 18.675C90.75 18.5 91.45 18.4 92.175 18.4C95.1875 18.4 97.825 20.0375 99.2375 22.475H99.4375V22.825C99.7875 23.4875 100.037 24.2125 100.2 24.975H108.725C112.175 24.975 114.975 27.775 114.975 31.225H61.9375C61.9375 26.3875 65.85 22.475 70.6875 22.475Z"
            fill="white"
          />
          <path
            d="M120.812 49.5002L132.95 52.5502C136.162 53.3627 138.125 56.6502 137.325 59.8877L126.35 104.287L120.812 49.5002Z"
            fill="#D3C7E5"
          />
          <path
            d="M113.125 47.5002L132.95 52.5503C136.162 53.3628 138.125 56.6503 137.325 59.8878L126.35 104.288L113.125 47.5002Z"
            fill="url(#paint2_linear_2129_98472)"
            fill-opacity="0.6"
          />
          <path
            d="M71.1497 50.8877L64.5497 52.5502C61.3372 53.3627 59.3747 56.6502 60.1747 59.8877L71.1497 104.288V50.8877Z"
            fill="#D3C7E5"
          />
          <path
            d="M71.1497 50.8877L64.5497 52.5502C61.3372 53.3627 59.3747 56.6502 60.1747 59.8877L71.1497 104.288V50.8877Z"
            fill="url(#paint3_linear_2129_98472)"
            fill-opacity="0.6"
          />
          <path
            d="M126.351 60.5003V108.475C126.351 111.812 123.676 114.525 120.351 114.525H77.1504C73.8379 114.525 71.1504 111.812 71.1504 108.475V47.9253C71.1504 44.5753 73.8379 41.8628 77.1504 41.8628H107.801C109.751 42.0878 111.576 42.9753 112.963 44.3878L123.876 55.4003C125.251 56.7753 126.113 58.5753 126.351 60.5003Z"
            fill="white"
          />
          <g filter="url(#filter1_f_2129_98472)">
            <path
              d="M120.362 111H77.1621C72.4121 111 71.1621 104.612 71.1621 101.275V108.487C71.1621 111.825 73.8496 114.537 77.1621 114.537H120.362C123.687 114.537 126.362 111.825 126.362 108.487V101.275C126.362 104.612 125.275 111 120.362 111Z"
              fill="#E9E2F2"
            />
          </g>
          <path
            d="M126.349 60.5003V73.9627H104.137C98.6117 73.9627 94.1367 69.4877 94.1367 63.9628V41.8628H107.799C109.749 42.0878 111.574 42.9753 112.962 44.3878L123.874 55.4003C125.249 56.7753 126.112 58.5753 126.349 60.5003Z"
            fill="url(#paint4_radial_2129_98472)"
          />
          <path
            d="M126.349 60.5003V61.4878C125.974 59.4878 124.374 57.9753 122.449 57.9753H116.899C112.487 57.9753 110.399 55.8753 110.399 51.4003V46.2128C110.399 44.0378 108.962 42.2003 107.074 41.8628H107.799C109.749 42.0878 111.574 42.9753 112.962 44.3878L123.874 55.4003C125.249 56.7753 126.112 58.5753 126.349 60.5003Z"
            fill="url(#paint5_linear_2129_98472)"
          />
          <path
            d="M81.5117 75.2625C82.6992 68.425 85.9617 63.075 90.3992 58.975C94.6742 55.025 103.124 50.1375 106.599 56.6125C108.987 61.0625 106.274 69.2125 101.699 69.5625C97.3867 69.8875 92.6867 54.125 98.4242 44.2375C99.3867 42.575 101.024 40.625 102.674 39.0625"
            stroke="#B096D6"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-dasharray="2 3"
          />
          <path
            d="M59.3871 63.4753H55.3121C54.2746 61.3378 52.0871 59.8628 49.5496 59.8628C46.2996 59.8628 43.6121 62.3003 43.2121 65.4378H41.1121C38.4121 65.4378 36.2246 67.6253 36.2246 70.3253H66.2246C66.2246 66.5378 63.1621 63.4878 59.3871 63.4878V63.4753Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_2129_98472"
          x="22.5508"
          y="-4.51245"
          width="153.762"
          height="137.562"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="10"
            result="effect1_foregroundBlur_2129_98472"
          />
        </filter>
        <filter
          id="filter1_f_2129_98472"
          x="67.1621"
          y="97.2749"
          width="63.1992"
          height="21.2625"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_2129_98472"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2129_98472"
          x1="99.4382"
          y1="113.05"
          x2="99.4382"
          y2="15.4875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#E9E2F2" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_2129_98472"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(98.6648 104.018) scale(81.9695 31.405)"
        >
          <stop offset="0.189313" stop-color="#BBA7DB" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </radialGradient>
        <linearGradient
          id="paint2_linear_2129_98472"
          x1="120.812"
          y1="76.9003"
          x2="137.5"
          y2="76.9003"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B49ED8" />
          <stop offset="1" stop-color="#B49ED8" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_2129_98472"
          x1="59.9997"
          y1="77.5877"
          x2="71.1497"
          y2="77.5877"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B49ED8" stop-opacity="0" />
          <stop offset="1" stop-color="#B49ED8" />
        </linearGradient>
        <radialGradient
          id="paint4_radial_2129_98472"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(118.037 50.1253) scale(22.2125 22.2125)"
        >
          <stop offset="0.18" stop-color="#E9E2F2" />
          <stop offset="0.77" stop-color="white" />
        </radialGradient>
        <linearGradient
          id="paint5_linear_2129_98472"
          x1="117.512"
          y1="50.8753"
          x2="113.074"
          y2="55.3128"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#DCD3EA" />
          <stop offset="1" stop-color="#CBBDE0" />
        </linearGradient>
        <clipPath id="clip0_2129_98472">
          <rect width="200" height="150" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FolderIcon = (props: IProps) => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 6.94H12.529C12.198 6.94 11.888 6.776 11.702 6.502L10.297 4.437C10.111 4.164 9.802 4 9.471 4H5C3.895 4 3 4.895 3 6V18C3 19.105 3.895 20 5 20H19C20.105 20 21 19.105 21 18V8.94C21 7.836 20.105 6.94 19 6.94Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FolderInfoIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99832 18.4198V16.584"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99832 13.9928C7.97427 13.9927 7.95122 14.0024 7.9343 14.0195C7.91739 14.0366 7.90802 14.0597 7.90829 14.0838C7.90829 14.1207 7.93058 14.154 7.96472 14.168C7.99886 14.182 8.0381 14.174 8.06405 14.1478C8.09001 14.1216 8.09755 14.0822 8.08314 14.0483C8.06874 14.0143 8.03523 13.9923 7.99832 13.9928"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99916 21.0037H5.9975C4.33995 21.0037 2.99625 19.66 2.99625 18.0025V14.0008C2.99625 12.3433 4.33995 10.9996 5.9975 10.9996H9.99916C11.6567 10.9996 13.0004 12.3433 13.0004 14.0008V18.0025C13.0004 19.66 11.6567 21.0037 9.99916 21.0037Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0017 19.0029H19.0029C20.1079 19.0029 21.0037 18.1071 21.0037 17.0021V7.93831C21.0037 6.83328 20.1079 5.93747 19.0029 5.93747H12.5292C12.1968 5.93764 11.886 5.77269 11.6999 5.49729L10.2993 3.43343C10.1125 3.15917 9.80179 2.99541 9.46994 2.99625H4.99708C3.89205 2.99625 2.99625 3.89205 2.99625 4.99708V8.99875"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FolderPlusIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.001 15.4974L12 12"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7487 13.7487L10.2513 13.7497"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.4923 18.9949C22.4923 20.2826 21.4484 21.3265 20.1607 21.3265H3.83931C2.55159 21.3265 1.50769 20.2826 1.50769 18.9949V5.00513C1.50769 3.71741 2.55159 2.6735 3.83931 2.6735H9.05115C9.43705 2.67351 9.79794 2.86447 10.015 3.18352L11.7006 5.66087C11.9177 5.97996 12.2786 6.17094 12.6645 6.17094H20.1607C21.4484 6.17094 22.4923 7.21484 22.4923 8.50256V18.9949Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FolderRenameIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.29289 18.3344L12.3344 15.2929C12.5219 15.1054 12.7763 15 13.0415 15C13.3067 15 13.5611 15.1054 13.7486 15.2929L14.7071 16.2514C15.0976 16.6419 15.0976 17.2751 14.7071 17.6656L11.6656 20.7071C11.4781 20.8946 11.2237 21 10.9585 21H9.5C9.22386 21 9 20.7761 9 20.5V19.0415C9 18.7763 9.10536 18.5219 9.29289 18.3344Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 20H19C20.1046 20 21 19.1046 21 18V8.94C21 7.83543 20.1046 6.94 19 6.94H12.5291C12.1981 6.94 11.8886 6.7762 11.7024 6.50253L10.2974 4.43747C10.1111 4.16379 9.80157 3.99999 9.47054 4H5C3.89543 4 3 4.89543 3 6V16"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.09999 21.0001C6.09995 21.0277 6.07757 21.05 6.04997 21.05C6.02237 21.05 6 21.0276 5.99999 21C5.99998 20.9724 6.02233 20.95 6.04993 20.95C6.06321 20.95 6.07595 20.9553 6.08534 20.9646C6.09473 20.974 6.1 20.9868 6.09999 21.0001"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.09999 21.0001C3.09995 21.0277 3.07757 21.05 3.04997 21.05C3.02237 21.05 3 21.0276 2.99999 21C2.99998 20.9724 3.02233 20.95 3.04993 20.95C3.06321 20.95 3.07595 20.9553 3.08534 20.9646C3.09473 20.974 3.1 20.9868 3.09999 21.0001"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FolderRequestIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.0017 19.0029H19.0029C20.1079 19.0029 21.0037 18.1071 21.0037 17.0021V7.93831C21.0037 6.83328 20.1079 5.93748 19.0029 5.93748H12.5292C12.1968 5.93765 11.886 5.77269 11.6999 5.49729L10.2993 3.43343C10.1125 3.15918 9.80179 2.99541 9.46994 2.99625H4.99708C3.89205 2.99625 2.99625 3.89206 2.99625 4.99708V8.99875"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8874 12.1126C14.0353 14.2605 14.0353 17.7429 11.8874 19.8908C9.73954 22.0386 6.25713 22.0386 4.10925 19.8908C1.96137 17.7429 1.96137 14.2605 4.10925 12.1126C6.25713 9.9647 9.73954 9.9647 11.8874 12.1126"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99832 18.9167C7.96832 18.9167 7.94332 18.9417 7.94332 18.9717C7.94332 19.0017 7.96832 19.0267 7.99832 19.0267C8.02832 19.0267 8.05332 19.0017 8.05332 18.9717C8.05332 18.9417 8.02832 18.9167 7.99832 18.9167V18.9167"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99832 16.6897C8.94732 16.6897 9.71732 15.9197 9.71732 14.9707C9.71732 14.0217 8.94832 13.2517 7.99832 13.2517C7.07232 13.2517 6.32332 13.9847 6.28632 14.9017"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FolderShareIcon = (props: IProps) => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.4705 17.5023L21.0248 16.9481C22.1399 15.8769 22.2352 14.1252 21.2428 12.9394C20.7233 12.3607 19.9886 12.0211 19.2112 12.0003C18.4337 11.9794 17.6819 12.2792 17.1321 12.8293L16.4649 13.4966M14.462 15.5015L13.9078 16.0557C12.7927 17.1269 12.6974 18.8785 13.6897 20.0644C14.2093 20.6431 14.9439 20.9827 15.7214 21.0035C16.4988 21.0243 17.2506 20.7245 17.8004 20.1744L18.4677 19.5071M15.7976 18.1706L19.135 14.8332M21.0037 8.99875V7.93831C21.0037 6.83328 20.1079 5.93747 19.0029 5.93747H12.5292C12.1968 5.93764 11.886 5.77269 11.6999 5.49729L10.2993 3.43343C10.1125 3.15917 9.80179 2.99541 9.46994 2.99625H4.99708C3.89205 2.99625 2.99625 3.89205 2.99625 4.99708V17.0021C2.99625 18.1071 3.89205 19.0029 4.99708 19.0029H9.99916"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const HiddenIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 19C11.158 19 10.315 18.822 9.49597 18.505"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.882 12.468C18.99 15.967 15.495 19 12 19"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.079 8.921C19.77 9.73 20.384 10.612 20.882 11.533C21.039 11.824 21.039 12.177 20.882 12.468"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 19L19 5"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.77302 14.227C8.54302 12.997 8.54302 11.002 9.77302 9.772C11.003 8.542 12.998 8.542 14.228 9.772"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.044 6.956C15.497 5.759 13.748 5 12 5C8.50499 5 5.00999 8.033 3.11799 11.533C2.96099 11.824 2.96099 12.177 3.11799 12.468C4.06399 14.217 5.40999 15.849 6.95599 17.045"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ImageIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.33 21.03H6.66998C6.1885 21.0313 5.7115 20.9376 5.2663 20.7543C4.82109 20.571 4.41642 20.3016 4.0755 19.9616C3.73458 19.6216 3.4641 19.2177 3.27954 18.7729C3.09498 18.3282 3 17.8515 3 17.37V6.67001C3 5.69667 3.38663 4.76318 4.07489 4.07492C4.76315 3.38666 5.69664 3 6.66998 3H17.33C17.812 3 18.2892 3.09495 18.7344 3.27939C19.1797 3.46382 19.5843 3.73413 19.9251 4.07492C20.2659 4.41571 20.5362 4.8203 20.7206 5.26556C20.9051 5.71083 21 6.18806 21 6.67001V17.34C21.004 17.824 20.9119 18.304 20.7291 18.7522C20.5463 19.2003 20.2765 19.6078 19.9352 19.951C19.5939 20.2942 19.1878 20.5663 18.7407 20.7515C18.2935 20.9367 17.814 21.0313 17.33 21.03ZM6.66998 5.03C6.23222 5.02993 5.81197 5.20176 5.49963 5.50848C5.1873 5.81521 5.00786 6.23232 5 6.67001V13.4154L6.65002 11.76C7.12161 11.2947 7.75745 11.0338 8.41998 11.0338C9.08251 11.0338 9.71841 11.2947 10.19 11.76L17.4277 18.9977C17.8291 18.9766 18.2105 18.8103 18.4998 18.528C18.8124 18.2229 18.9921 17.8068 19 17.37V6.67001C19 6.2271 18.824 5.80232 18.5109 5.48914C18.1977 5.17595 17.7729 5 17.33 5L6.66998 5.03ZM8.03003 13.18L5 16.24V17.34C5 17.5589 5.04327 17.7755 5.12732 17.9776C5.21137 18.1797 5.33454 18.3631 5.48975 18.5174C5.64495 18.6716 5.82912 18.7937 6.03168 18.8765C6.23423 18.9594 6.45115 19.0013 6.66998 19H14.55L8.72998 13.18C8.68509 13.1322 8.63088 13.0941 8.57068 13.068C8.51048 13.0419 8.4456 13.0285 8.38 13.0285C8.31441 13.0285 8.24953 13.0419 8.18933 13.068C8.12913 13.0941 8.07492 13.1322 8.03003 13.18ZM12.5487 11.4913C13.1113 12.0539 13.8743 12.37 14.67 12.37C15.4656 12.37 16.2287 12.0539 16.7913 11.4913C17.3539 10.9287 17.67 10.1657 17.67 9.37003C17.67 8.57438 17.3539 7.8113 16.7913 7.24869C16.2287 6.68608 15.4656 6.37003 14.67 6.37003C13.8743 6.37003 13.1113 6.68608 12.5487 7.24869C11.9861 7.8113 11.67 8.57438 11.67 9.37003C11.67 10.1657 11.9861 10.9287 12.5487 11.4913ZM13.9629 8.6629C14.1504 8.47537 14.4048 8.37003 14.67 8.37003C14.9352 8.37003 15.1896 8.47537 15.3771 8.6629C15.5647 8.85044 15.67 9.10481 15.67 9.37003C15.67 9.63524 15.5647 9.88958 15.3771 10.0771C15.1896 10.2647 14.9352 10.37 14.67 10.37C14.4048 10.37 14.1504 10.2647 13.9629 10.0771C13.7754 9.88958 13.67 9.63524 13.67 9.37003C13.67 9.10481 13.7754 8.85044 13.9629 8.6629Z"
        fill="currentColor;"
      />
    </svg>
  );
};

export const InfoIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.999 8C11.861 8 11.749 8.112 11.75 8.25C11.75 8.388 11.862 8.5 12 8.5C12.138 8.5 12.25 8.388 12.25 8.25C12.25 8.112 12.138 8 11.999 8"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21V21C7.029 21 3 16.971 3 12V12C3 7.029 7.029 3 12 3V3C16.971 3 21 7.029 21 12V12C21 16.971 16.971 21 12 21Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12V17"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const InvisibleIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.61023 20.9216C3.73207 20.9713 3.86253 20.9965 3.99414 20.9958C4.12575 20.9965 4.25621 20.9713 4.37805 20.9216C4.49989 20.8718 4.61071 20.7985 4.70415 20.7058L10.2242 15.1858C10.2261 15.1839 10.228 15.1819 10.23 15.18L15.1742 10.2358L20.7041 4.70581C20.8904 4.51845 20.9949 4.26498 20.9949 4.00079C20.9949 3.73661 20.8904 3.48314 20.7041 3.29578C20.6112 3.20205 20.5006 3.12767 20.3787 3.0769C20.2569 3.02614 20.1262 3 19.9941 3C19.8621 3 19.7314 3.02614 19.6096 3.0769C19.4877 3.12767 19.3771 3.20205 19.2841 3.29578L17.1844 5.39547C15.6194 4.46212 13.8266 3.96551 11.9942 3.96582C9.8385 3.98566 7.74106 4.66787 5.98622 5.92004C4.23139 7.17222 2.90406 8.93378 2.18419 10.9658C1.9386 11.634 1.9386 12.3677 2.18419 13.0358C2.81206 14.7196 3.84558 16.2153 5.18555 17.3944L3.28413 19.2958C3.09788 19.4831 2.99335 19.7366 2.99335 20.0008C2.99335 20.265 3.09788 20.5184 3.28413 20.7058C3.37757 20.7985 3.48839 20.8718 3.61023 20.9216ZM6.61739 15.9625L8.18292 14.397C8.04827 14.1831 7.93164 13.9577 7.83454 13.7231C7.60796 13.1755 7.49227 12.5884 7.49416 11.9958C7.49681 10.8031 7.97176 9.66006 8.8151 8.81672C9.65844 7.97338 10.8015 7.49844 11.9942 7.4958C12.5852 7.49467 13.1705 7.61077 13.7164 7.83735C13.9517 7.93503 14.1777 8.05241 14.392 8.18795L15.7144 6.86547C14.5672 6.27988 13.2932 5.96918 11.9942 5.96582C10.2482 5.98486 8.55015 6.53992 7.12999 7.55585C5.70984 8.57178 4.63613 9.99951 4.05419 11.6458C3.97417 11.8551 3.97417 12.0865 4.05419 12.2958C4.58479 13.7201 5.4688 14.9808 6.61739 15.9625ZM12.9113 9.66865C12.6195 9.55311 12.3082 9.49436 11.9942 9.4958C11.3319 9.49843 10.6976 9.76269 10.2293 10.231C9.76103 10.6992 9.4968 11.3336 9.49416 11.9958C9.49308 12.31 9.55148 12.6215 9.66614 12.9138L12.9113 9.66865ZM11.9942 19.9958C11.2506 20.0039 10.5087 19.9233 9.78417 19.7558C9.65609 19.7263 9.53509 19.6719 9.42806 19.5956C9.32103 19.5194 9.23009 19.4227 9.16044 19.3113C9.09078 19.1998 9.04377 19.0757 9.0221 18.9461C9.00044 18.8165 9.00454 18.6838 9.03417 18.5558C9.06364 18.4277 9.11808 18.3067 9.19436 18.1997C9.27063 18.0927 9.36726 18.0017 9.47871 17.9321C9.59016 17.8624 9.71425 17.8154 9.84388 17.7938C9.97351 17.7721 10.1061 17.7761 10.2342 17.8058C10.8115 17.9369 11.4021 18.0007 11.9942 17.9958C13.7393 17.9789 15.4371 17.4259 16.8574 16.4117C18.2777 15.3974 19.3518 13.971 19.9342 12.3258C20.0142 12.1165 20.0142 11.885 19.9342 11.6758C19.6743 11.0159 19.3387 10.3883 18.9342 9.80578C18.7793 9.58153 18.7158 9.30662 18.7567 9.03716C18.7976 8.7677 18.9397 8.52398 19.1542 8.35576C19.3639 8.21301 19.62 8.15534 19.8706 8.19433C20.1213 8.23332 20.3478 8.36608 20.5042 8.56579L19.6742 9.12578L20.5442 8.62578C21.0421 9.35469 21.4517 10.1402 21.7642 10.9658C22.0098 11.634 22.0098 12.3677 21.7642 13.0358C21.0413 15.0548 19.7175 16.8041 17.9709 18.0483C16.2243 19.2926 14.1386 19.9722 11.9942 19.9958ZM12.425 16.1561C12.6059 16.2827 12.8236 16.3459 13.0442 16.3358C13.12 16.321 13.1938 16.2976 13.2642 16.2658C13.9728 16.0518 14.6175 15.6659 15.1409 15.1425C15.6643 14.6191 16.0502 13.9744 16.2642 13.2658C16.3385 13.0112 16.3085 12.7375 16.181 12.5049C16.0535 12.2724 15.8388 12.1001 15.5842 12.0258C15.4581 11.989 15.326 11.9774 15.1955 11.9917C15.065 12.006 14.9385 12.0459 14.8234 12.109C14.7082 12.1721 14.6066 12.2573 14.5244 12.3597C14.4422 12.4621 14.381 12.5797 14.3442 12.7058C14.2299 13.1006 14.0193 13.4609 13.7313 13.7541C13.4433 14.0474 13.0869 14.2644 12.6942 14.3858C12.4428 14.4662 12.2334 14.6427 12.1117 14.8769C11.9899 15.111 11.9657 15.3838 12.0442 15.6358C12.1102 15.8465 12.2441 16.0294 12.425 16.1561Z"
        fill="black"
      />
    </svg>
  );
};

export const LogoIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.1432 23.2414V22.9359H22.6982C21.4309 22.9361 20.2127 22.4462 19.2984 21.5686H1.63672L4.24239 24.1811H23.2034C23.4527 24.1811 23.6917 24.0821 23.868 23.9059C24.0442 23.7296 24.1432 23.4906 24.1432 23.2414Z"
        fill="#7446B2"
      />
      <path
        d="M18.3401 14.645L19.0825 14.6614C19.543 14.1611 20.1018 13.7614 20.7241 13.4872C21.3464 13.2131 22.0186 13.0706 22.6985 13.0685H24.1435V12.796C24.1435 12.5468 24.0445 12.3077 23.8682 12.1315C23.692 11.9553 23.4529 11.8563 23.2037 11.8563H17.0948C16.8158 11.8569 16.5428 11.7748 16.3105 11.6203C16.0782 11.4657 15.8969 11.2457 15.7897 10.9881C15.6826 10.7305 15.6543 10.4468 15.7084 10.1731C15.7625 9.8994 15.8967 9.64791 16.0939 9.45049L22.7432 2.80173L21.3334 1.39209C20.4522 0.51121 19.2572 0.0163574 18.0111 0.0163574C16.7651 0.0163574 15.5701 0.51121 14.6888 1.39209L4.99219 11.0645C12.1654 14.45 18.2555 14.6426 18.3401 14.645Z"
        fill="#7446B2"
      />
      <path
        d="M16.6574 16.8721C11.9791 16.3173 7.43346 14.9506 3.22493 12.8335L1.38522 14.6731L1.35938 14.7013C6.37899 15.9049 11.5011 16.6317 16.6574 16.8721Z"
        fill="#7446B2"
      />
      <path
        d="M34.6135 14.6733L29.1602 9.22036C28.5108 8.57105 28.0659 7.7457 27.8805 6.84632C27.6951 5.94694 27.7773 5.01295 28.117 4.15978L29.5103 0.659197C29.5288 0.609322 29.5299 0.554619 29.5133 0.504046C29.4968 0.453473 29.4635 0.410027 29.419 0.380821C29.3745 0.351616 29.3214 0.338381 29.2684 0.343285C29.2154 0.348188 29.1657 0.37094 29.1273 0.407813L20.495 9.03711H23.204C24.2011 9.03711 25.1572 9.43315 25.8623 10.1381C26.5673 10.8431 26.9633 11.7992 26.9633 12.7961V23.2415C26.9633 24.2384 26.5673 25.1946 25.8623 25.8995C25.1572 26.6045 24.2011 27.0005 23.204 27.0005H7.0625L14.6704 34.6078C15.5516 35.4887 16.7466 35.9836 17.9927 35.9836C19.2387 35.9836 20.4338 35.4887 21.315 34.6078L34.6065 21.3173C35.4884 20.4371 35.9845 19.2427 35.9858 17.9968C35.9872 16.7508 35.4935 15.5554 34.6135 14.6733Z"
        fill="#7446B2"
      />
      <path
        d="M24.144 14.948H22.699C21.8889 14.948 21.112 15.2698 20.5392 15.8426C19.9663 16.4153 19.6445 17.1922 19.6445 18.0022C19.6445 18.8122 19.9663 19.5891 20.5392 20.1618C21.112 20.7346 21.8889 21.0564 22.699 21.0564H24.144V14.948Z"
        fill="#7446B2"
      />
      <path
        d="M0.175534 19.2193H16.4604C10.9613 18.9666 5.50125 18.1654 0.161437 16.8276C-0.0402521 17.6127 -0.0353957 18.4366 0.175534 19.2193Z"
        fill="#7446B2"
      />
    </svg>
  );
};

export const LogoMobileIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 80 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1149_59127)">
        <path
          d="M24.6154 17.6599C24.6154 18.2141 24.8355 18.7456 25.2274 19.1374C25.6193 19.5293 26.1508 19.7495 26.705 19.7495H37.3439C37.9235 19.7495 38.4796 19.52 38.8905 19.1111C39.3014 18.7023 39.5337 18.1474 39.5366 17.5678V15.9583C39.5366 15.3768 39.3055 14.8191 38.8943 14.4079C38.4831 13.9967 37.9254 13.7657 37.3439 13.7657H35.2718L36.4887 12.5487C36.8247 12.212 37.0134 11.7559 37.0134 11.2802C37.0134 10.8046 36.8247 10.3484 36.4887 10.0118L32.4279 14.0814C32.2539 14.2558 32.147 14.4861 32.1262 14.7316C32.1053 14.9771 32.1718 15.222 32.3139 15.4233C32.4178 15.5619 32.553 15.6739 32.7085 15.7501C32.864 15.8263 33.0353 15.8646 33.2085 15.8619H37.3439C37.3683 15.8619 37.3917 15.8716 37.409 15.8888C37.4263 15.9061 37.436 15.9295 37.436 15.9539V17.5634C37.436 17.5878 37.4263 17.6112 37.409 17.6285C37.3917 17.6458 37.3683 17.6555 37.3439 17.6555H30.6606C30.6606 17.6248 30.6606 17.5941 30.6606 17.5634V10.3867H28.571V17.5678C28.571 17.5922 28.5613 17.6156 28.544 17.6329C28.5267 17.6502 28.5033 17.6599 28.4789 17.6599H26.7006L26.6502 10.3955L24.5605 10.4108L24.611 17.6599"
          fill="#5D388E"
        />
        <path
          d="M13.2684 17.6599V13.4324H9.1878C8.60816 13.4324 8.0521 13.6619 7.6412 14.0707C7.23031 14.4796 6.99802 15.0345 6.99512 15.6141V19.7495H11.1612V21.9904C11.4356 21.9904 11.7074 21.9364 11.9609 21.8313C12.2144 21.7263 12.4448 21.5724 12.6388 21.3784C12.8328 21.1843 12.9868 20.954 13.0918 20.7005C13.1968 20.4469 13.2508 20.1752 13.2508 19.9008V19.7495H20.5415C21.1056 19.7501 21.6483 19.5333 22.0566 19.1441C22.465 18.7549 22.7077 18.2234 22.7342 17.6599H13.2684ZM11.1788 17.6599H9.09351V15.6141C9.09351 15.6018 9.09596 15.5897 9.10073 15.5783C9.10549 15.567 9.11247 15.5568 9.12126 15.5482C9.13004 15.5396 9.14046 15.5329 9.15188 15.5284C9.16331 15.5239 9.17552 15.5217 9.1878 15.522H11.1788V17.6599Z"
          fill="#5D388E"
        />
        <path
          d="M3 21.9904C3.5542 21.9904 4.08571 21.7703 4.47759 21.3784C4.86947 20.9865 5.08963 20.455 5.08963 19.9008V13.3754H3V21.9904Z"
          fill="#5D388E"
        />
        <path
          d="M66.715 20.666V20.392H65.4323C64.3055 20.3918 63.2223 19.9566 62.4086 19.1772H46.7002L49.0244 21.4993H65.8796C66.1006 21.4987 66.3124 21.4108 66.4689 21.2547C66.6254 21.0986 66.7138 20.8871 66.715 20.666Z"
          fill="#7446B2"
        />
        <path
          d="M61.5445 13.0202L62.2024 13.0355C62.6135 12.5891 63.1129 12.2329 63.6689 11.9895C64.2248 11.746 64.8253 11.6206 65.4322 11.6212H66.7149V11.3756C66.7143 11.1543 66.6261 10.9421 66.4696 10.7856C66.313 10.629 66.1009 10.5408 65.8795 10.5402H60.4482C60.2003 10.5403 59.9579 10.4668 59.7516 10.3291C59.5454 10.1914 59.3846 9.99573 59.2896 9.76672C59.1946 9.5377 59.1696 9.28566 59.2177 9.04243C59.2659 8.7992 59.385 8.5757 59.5602 8.40017L65.4804 2.47993L64.2152 1.21694C63.4315 0.433512 62.3687 -0.0065918 61.2606 -0.0065918C60.1524 -0.0065918 59.0897 0.433512 58.306 1.21694L49.6865 9.83638C56.0628 12.8469 61.481 13.018 61.5445 13.0202Z"
          fill="#7446B2"
        />
        <path
          d="M60.058 15.0001C55.8968 14.5059 51.8541 13.2882 48.1123 11.4019L46.4765 13.0377L46.4524 13.064C50.9166 14.1359 55.472 14.7842 60.058 15.0001Z"
          fill="#7446B2"
        />
        <path
          d="M76.0272 13.0443L71.1769 8.19405C70.5998 7.61615 70.2045 6.88196 70.0397 6.08204C69.8748 5.28212 69.9478 4.45145 70.2494 3.69248L71.4905 0.581064C71.4985 0.538177 71.4935 0.493881 71.4762 0.453841C71.4589 0.413802 71.43 0.379839 71.3933 0.356296C71.3565 0.332753 71.3136 0.3207 71.27 0.32168C71.2264 0.32266 71.1841 0.336627 71.1484 0.361795L63.4741 8.03618H65.886C66.7702 8.03908 67.6172 8.39205 68.2418 9.01788C68.8664 9.64371 69.2177 10.4915 69.2189 11.3756V20.666C69.2189 21.5529 68.8666 22.4034 68.2395 23.0305C67.6124 23.6576 66.7619 24.0099 65.875 24.0099H51.5305L58.2971 30.7743C58.6843 31.1638 59.1447 31.4729 59.6517 31.6838C60.1588 31.8947 60.7026 32.0033 61.2518 32.0033C61.801 32.0033 62.3447 31.8947 62.8518 31.6838C63.3589 31.4729 63.8192 31.1638 64.2064 30.7743L76.0272 18.9557C76.4157 18.5678 76.7239 18.107 76.9342 17.5999C77.1445 17.0927 77.2527 16.549 77.2527 16C77.2527 15.451 77.1445 14.9073 76.9342 14.4001C76.7239 13.893 76.4157 13.4322 76.0272 13.0443Z"
          fill="#7446B2"
        />
        <path
          d="M66.715 13.2899H65.4323C64.7118 13.2899 64.0208 13.5761 63.5113 14.0856C63.0018 14.5951 62.7156 15.2861 62.7156 16.0066C62.7156 16.7271 63.0018 17.4181 63.5113 17.9276C64.0208 18.4371 64.7118 18.7233 65.4323 18.7233H66.715V13.2899Z"
          fill="#7446B2"
        />
        <path
          d="M45.4 17.0898H59.8717C54.9839 16.8635 50.1309 16.1503 45.3847 14.9607C45.2066 15.6599 45.2119 16.3932 45.4 17.0898Z"
          fill="#7446B2"
        />
      </g>
      <defs>
        <clipPath id="clip0_1149_59127">
          <rect width="80" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const MoreDotIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_363_33395)">
        <path
          d="M12 4.5C11.1161 4.5 10.3929 5.22321 10.3929 6.10714C10.3929 6.99107 11.1161 7.71429 12 7.71429C12.884 7.71429 13.6072 6.99107 13.6072 6.10714C13.6072 5.22321 12.884 4.5 12 4.5ZM12 16.2857C11.1161 16.2857 10.3929 17.0089 10.3929 17.8929C10.3929 18.7768 11.1161 19.5 12 19.5C12.884 19.5 13.6072 18.7768 13.6072 17.8929C13.6072 17.0089 12.884 16.2857 12 16.2857ZM12 10.3929C11.1161 10.3929 10.3929 11.1161 10.3929 12C10.3929 12.8839 11.1161 13.6071 12 13.6071C12.884 13.6071 13.6072 12.8839 13.6072 12C13.6072 11.1161 12.884 10.3929 12 10.3929Z"
          fill="#1B1B1D"
        />
      </g>
      <defs>
        <clipPath id="clip0_363_33395">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const MoreLineIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 6H20M4 12H20M4 18H20" stroke="#1B1B1D" strokeWidth="1.5" />
    </svg>
  );
};

export const MyFolderIcon = (props: IProps) => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 6.94H12.529C12.198 6.94 11.888 6.776 11.702 6.502L10.297 4.437C10.111 4.164 9.802 4 9.471 4H5C3.895 4 3 4.895 3 6V18C3 19.105 3.895 20 5 20H19C20.105 20 21 19.105 21 18V8.94C21 7.836 20.105 6.94 19 6.94Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.005 13.485C15.002 13.485 15 13.487 15 13.49C15 13.493 15.002 13.495 15.005 13.495C15.008 13.495 15.01 13.493 15.01 13.49C15.01 13.487 15.008 13.485 15.005 13.485"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.995 16.995C14.992 16.995 14.99 16.997 14.99 17C14.99 17.003 14.992 17.005 14.995 17.005C14.998 17.005 15 17.003 15 17C15 16.997 14.998 16.995 14.995 16.995"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.995 9.995C14.992 9.995 14.99 9.997 14.99 10C14.99 10.003 14.992 10.005 14.995 10.005C14.998 10.005 15 10.003 15 10C15 9.997 14.998 9.995 14.995 9.995"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const PlusIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2929 18.7071C11.4804 18.8946 11.7348 19 12 19C12.2652 19 12.5196 18.8946 12.7071 18.7071C12.8946 18.5196 13 18.2652 13 18V13H18C18.2652 13 18.5196 12.8946 18.7071 12.7071C18.8946 12.5196 19 12.2652 19 12C19 11.7348 18.8946 11.4804 18.7071 11.2929C18.5196 11.1054 18.2652 11 18 11H13V6C13 5.73478 12.8946 5.48044 12.7071 5.29291C12.5196 5.10537 12.2652 5 12 5C11.7348 5 11.4804 5.10537 11.2929 5.29291C11.1054 5.48044 11 5.73478 11 6V11H6C5.73478 11 5.48043 11.1054 5.29289 11.2929C5.10536 11.4804 5 11.7348 5 12C5 12.2652 5.10536 12.5196 5.29289 12.7071C5.48043 12.8946 5.73478 13 6 13H11V18C11 18.2652 11.1054 18.5196 11.2929 18.7071Z"
        fill="currentColor;"
      />
    </svg>
  );
};

export const QuestionIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 15.4799C4.14476 15.4799 1.02008 12.3552 1.02008 8.49994C1.02008 4.6447 4.14476 1.52002 8 1.52002C11.8552 1.52002 14.9799 4.6447 14.9799 8.49994C14.9799 12.3552 11.8552 15.4799 8 15.4799Z"
        fill="#9AA6B1"
      />
      <path
        d="M7.99999 9.33326V9.16659C7.99999 8.62192 8.33666 8.32659 8.67399 8.09992C9.00332 7.87792 9.33332 7.58859 9.33332 7.05526C9.33332 6.31859 8.73666 5.72192 7.99999 5.72192C7.26332 5.72192 6.66666 6.31859 6.66666 7.05526"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99933 11.1667C7.90733 11.1667 7.83266 11.2413 7.83333 11.3333C7.83333 11.4253 7.90799 11.5 7.99999 11.5C8.09199 11.5 8.16666 11.4253 8.16666 11.3333C8.16666 11.2413 8.09199 11.1667 7.99933 11.1667"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const RepoIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 130"
      fill="none"
    >
      <g id="Frame">
        <g id="Group 811520">
          <path
            id="Vector"
            d="M20.846 21.8466C20.8246 21.0701 20.9589 20.2972 21.241 19.5735C21.5231 18.8497 21.9473 18.1898 22.4886 17.6327C23.0299 17.0755 23.6773 16.6324 24.3926 16.3295C25.1078 16.0266 25.8765 15.87 26.6533 15.869H55.5161C56.6396 15.869 57.7336 16.2162 58.654 16.8615L70.0982 24.9026C71.0153 25.5478 72.1126 25.895 73.236 25.895H133.3C136.582 25.895 139.216 28.6103 139.114 31.889L136.897 103.548C136.809 106.383 135.621 109.073 133.585 111.048C131.548 113.023 128.823 114.127 125.986 114.128H34.023C31.1802 114.128 28.4495 113.019 26.4114 111.038C24.3733 109.056 23.1887 106.357 23.1093 103.515L20.8428 21.8433L20.846 21.8466Z"
            fill="url(#paint0_linear_624_104765)"
          />
          <g id="Group" filter="url(#filter0_d_624_104765)">
            <path
              id="Vector_2"
              d="M15.2219 47.7025C15.1291 46.5745 15.2711 45.4396 15.639 44.3693C16.0069 43.299 16.5927 42.3166 17.3593 41.4841C18.126 40.6515 19.0569 39.987 20.0933 39.5323C21.1298 39.0777 22.2492 38.8428 23.3809 38.8425H136.618C137.75 38.8428 138.869 39.0777 139.906 39.5323C140.942 39.987 141.873 40.6515 142.64 41.4841C143.406 42.3166 143.992 43.299 144.36 44.3693C144.728 45.4396 144.87 46.5745 144.777 47.7025L140.136 104.108C139.911 106.84 138.668 109.387 136.652 111.243C134.636 113.1 131.996 114.131 129.255 114.131H30.744C28.0034 114.131 25.3629 113.1 23.3471 111.243C21.3313 109.387 20.0876 106.84 19.8632 104.108L15.2219 47.7025Z"
              fill="url(#paint1_linear_624_104765)"
            />
          </g>
          <path
            id="Vector_3"
            opacity="0.5"
            d="M64.9791 54.1814H34.9732C32.7066 54.1814 30.8691 56.0189 30.8691 58.2855V58.2887C30.8691 60.5554 32.7066 62.3928 34.9732 62.3928H64.9791C67.2458 62.3928 69.0832 60.5554 69.0832 58.2887V58.2855C69.0832 56.0189 67.2458 54.1814 64.9791 54.1814Z"
            fill="#EBC350"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_624_104765"
          x="15.1943"
          y="38.8425"
          width="129.61"
          height="75.8714"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.583021" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_624_104765"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_624_104765"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_624_104765"
          x1="89.9995"
          y1="15.869"
          x2="89.9995"
          y2="114.128"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFCA41" />
          <stop offset="1" stopColor="#FFAB5E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_624_104765"
          x1="21.9856"
          y1="33.3661"
          x2="155.946"
          y2="113.017"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF7D" />
          <stop offset="1" stopColor="#FFDA86" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const RepoPurpleIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      width="58"
      height="47"
      viewBox="0 0 58 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.61298 4.97998C3.60378 4.64673 3.66142 4.31502 3.78249 4.00441C3.90357 3.6938 4.08562 3.41058 4.31792 3.17147C4.55022 2.93235 4.82806 2.74219 5.13504 2.61219C5.44203 2.48219 5.77194 2.41499 6.10531 2.41455H18.4925C18.9746 2.41455 19.4441 2.56356 19.8391 2.84048L24.7507 6.29151C25.1443 6.56844 25.6152 6.71744 26.0974 6.71744H51.8754C53.2839 6.71744 54.4141 7.88278 54.3705 9.2899L53.4188 40.0441C53.3812 41.261 52.8714 42.4154 51.9974 43.2629C51.1234 44.1104 49.9538 44.5844 48.7364 44.5846H9.26817C8.04813 44.5847 6.87617 44.1089 6.00148 43.2583C5.12679 42.4078 4.61837 41.2496 4.58433 40.0301L3.61157 4.97857L3.61298 4.97998Z"
        fill="url(#paint0_linear_624_87506)"
      />
      <g filter="url(#filter0_d_624_87506)">
        <path
          d="M1.19934 16.0764C1.15951 15.5923 1.22046 15.1052 1.37835 14.6459C1.53623 14.1865 1.78763 13.7649 2.11666 13.4076C2.44569 13.0503 2.84522 12.7651 3.29002 12.57C3.73482 12.3748 4.21525 12.274 4.70097 12.2739H53.2993C53.785 12.274 54.2655 12.3748 54.7103 12.57C55.1551 12.7651 55.5546 13.0503 55.8836 13.4076C56.2127 13.7649 56.4641 14.1865 56.6219 14.6459C56.7798 15.1052 56.8408 15.5923 56.801 16.0764L54.8091 40.2842C54.7127 41.4565 54.179 42.5496 53.3138 43.3465C52.4487 44.1434 51.3155 44.5857 50.1393 44.5857H7.86102C6.68479 44.5857 5.55158 44.1434 4.68645 43.3465C3.82132 42.5496 3.28757 41.4565 3.19123 40.2842L1.19934 16.0764Z"
          fill="url(#paint1_linear_624_87506)"
        />
      </g>
      <path
        opacity="0.5"
        d="M22.5529 18.8572H9.67518C8.70241 18.8572 7.91382 19.6458 7.91382 20.6185V20.6199C7.91382 21.5927 8.70241 22.3813 9.67518 22.3813H22.5529C23.5257 22.3813 24.3143 21.5927 24.3143 20.6199V20.6185C24.3143 19.6458 23.5257 18.8572 22.5529 18.8572Z"
        fill="#9E50EB"
      />
      <defs>
        <filter
          id="filter0_d_624_87506"
          x="1.1875"
          y="12.2739"
          width="55.6252"
          height="32.562"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.250217" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_624_87506"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_624_87506"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_624_87506"
          x1="33.2918"
          y1="2.41455"
          x2="33.2918"
          y2="44.5846"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#BA75FF" />
          <stop offset="1" stop-color="#8000FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_624_87506"
          x1="4.10214"
          y1="9.92357"
          x2="61.5944"
          y2="44.1077"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#BE7DFF" />
          <stop offset="1" stop-color="#C386FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const RepoRedIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      width="58"
      height="47"
      viewBox="0 0 58 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.61298 4.97998C3.60378 4.64673 3.66142 4.31502 3.78249 4.00441C3.90357 3.6938 4.08562 3.41058 4.31792 3.17147C4.55022 2.93235 4.82806 2.74219 5.13504 2.61219C5.44203 2.48219 5.77194 2.41499 6.10531 2.41455H18.4925C18.9746 2.41455 19.4441 2.56356 19.8391 2.84048L24.7507 6.29151C25.1443 6.56844 25.6152 6.71744 26.0974 6.71744H51.8754C53.2839 6.71744 54.4141 7.88278 54.3705 9.2899L53.4188 40.0441C53.3812 41.261 52.8714 42.4154 51.9974 43.2629C51.1234 44.1104 49.9538 44.5844 48.7364 44.5846H9.26817C8.04813 44.5847 6.87617 44.1089 6.00148 43.2583C5.12679 42.4078 4.61837 41.2496 4.58433 40.0301L3.61157 4.97857L3.61298 4.97998Z"
        fill="url(#paint0_linear_624_87497)"
      />
      <g filter="url(#filter0_d_624_87497)">
        <path
          d="M1.19934 16.0764C1.15951 15.5923 1.22046 15.1052 1.37835 14.6459C1.53623 14.1865 1.78763 13.7649 2.11666 13.4076C2.44569 13.0503 2.84522 12.7651 3.29002 12.57C3.73482 12.3748 4.21525 12.274 4.70097 12.2739H53.2993C53.785 12.274 54.2655 12.3748 54.7103 12.57C55.1551 12.7651 55.5546 13.0503 55.8836 13.4076C56.2127 13.7649 56.4641 14.1865 56.6219 14.6459C56.7798 15.1052 56.8408 15.5923 56.801 16.0764L54.8091 40.2842C54.7127 41.4565 54.179 42.5496 53.3138 43.3465C52.4487 44.1434 51.3155 44.5857 50.1393 44.5857H7.86102C6.68479 44.5857 5.55158 44.1434 4.68645 43.3465C3.82132 42.5496 3.28757 41.4565 3.19123 40.2842L1.19934 16.0764Z"
          fill="url(#paint1_linear_624_87497)"
        />
      </g>
      <path
        opacity="0.5"
        d="M22.5529 18.8572H9.67518C8.70241 18.8572 7.91382 19.6458 7.91382 20.6185V20.6199C7.91382 21.5927 8.70241 22.3813 9.67518 22.3813H22.5529C23.5257 22.3813 24.3143 21.5927 24.3143 20.6199V20.6185C24.3143 19.6458 23.5257 18.8572 22.5529 18.8572Z"
        fill="#EB5050"
      />
      <defs>
        <filter
          id="filter0_d_624_87497"
          x="1.1875"
          y="12.2739"
          width="55.6252"
          height="32.562"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.250217" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_624_87497"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_624_87497"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_624_87497"
          x1="33.2918"
          y1="2.41455"
          x2="33.2918"
          y2="44.5846"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF6B6B" />
          <stop offset="1" stop-color="#CC0000" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_624_87497"
          x1="4.10214"
          y1="9.92357"
          x2="61.5944"
          y2="44.1077"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF7D7D" />
          <stop offset="1" stop-color="#FF8686" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const RepoBlueIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      width="58"
      height="47"
      viewBox="0 0 58 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.61298 4.97998C3.60378 4.64673 3.66142 4.31502 3.78249 4.00441C3.90357 3.6938 4.08562 3.41058 4.31792 3.17147C4.55022 2.93235 4.82806 2.74219 5.13504 2.61219C5.44203 2.48219 5.77194 2.41499 6.10531 2.41455H18.4925C18.9746 2.41455 19.4441 2.56356 19.8391 2.84048L24.7507 6.29151C25.1443 6.56844 25.6152 6.71744 26.0974 6.71744H51.8754C53.2839 6.71744 54.4141 7.88278 54.3705 9.2899L53.4188 40.0441C53.3812 41.261 52.8714 42.4154 51.9974 43.2629C51.1234 44.1104 49.9538 44.5844 48.7364 44.5846H9.26817C8.04813 44.5847 6.87617 44.1089 6.00148 43.2583C5.12679 42.4078 4.61837 41.2496 4.58433 40.0301L3.61157 4.97857L3.61298 4.97998Z"
        fill="url(#paint0_linear_624_87489)"
      />
      <g filter="url(#filter0_d_624_87489)">
        <path
          d="M1.19934 16.0764C1.15951 15.5923 1.22046 15.1052 1.37835 14.6459C1.53623 14.1865 1.78763 13.7649 2.11666 13.4076C2.44569 13.0503 2.84522 12.7651 3.29002 12.57C3.73482 12.3748 4.21525 12.274 4.70097 12.2739H53.2993C53.785 12.274 54.2655 12.3748 54.7103 12.57C55.1551 12.7651 55.5546 13.0503 55.8836 13.4076C56.2127 13.7649 56.4641 14.1865 56.6219 14.6459C56.7798 15.1052 56.8408 15.5923 56.801 16.0764L54.8091 40.2842C54.7127 41.4565 54.179 42.5496 53.3138 43.3465C52.4487 44.1434 51.3155 44.5857 50.1393 44.5857H7.86102C6.68479 44.5857 5.55158 44.1434 4.68645 43.3465C3.82132 42.5496 3.28757 41.4565 3.19123 40.2842L1.19934 16.0764Z"
          fill="url(#paint1_linear_624_87489)"
        />
      </g>
      <path
        opacity="0.5"
        d="M22.5529 18.8572H9.67518C8.70241 18.8572 7.91382 19.6458 7.91382 20.6185V20.6199C7.91382 21.5927 8.70241 22.3813 9.67518 22.3813H22.5529C23.5257 22.3813 24.3143 21.5927 24.3143 20.6199V20.6185C24.3143 19.6458 23.5257 18.8572 22.5529 18.8572Z"
        fill="#3A94E9"
      />
      <defs>
        <filter
          id="filter0_d_624_87489"
          x="1.1875"
          y="12.2739"
          width="55.6252"
          height="32.562"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.250217" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_624_87489"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_624_87489"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_624_87489"
          x1="33.2918"
          y1="2.41455"
          x2="33.2918"
          y2="44.5846"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#42A4FF" />
          <stop offset="1" stop-color="#0069CC" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_624_87489"
          x1="4.10214"
          y1="9.92357"
          x2="61.5944"
          y2="44.1077"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#7DC0FF" />
          <stop offset="1" stop-color="#4DA9FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const RepoYellowIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      width="58"
      height="47"
      viewBox="0 0 58 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.61298 4.97998C3.60378 4.64673 3.66142 4.31502 3.78249 4.00441C3.90357 3.6938 4.08562 3.41058 4.31792 3.17147C4.55022 2.93235 4.82806 2.74219 5.13504 2.61219C5.44203 2.48219 5.77194 2.41499 6.10531 2.41455H18.4925C18.9746 2.41455 19.4441 2.56356 19.8391 2.84048L24.7507 6.29151C25.1443 6.56844 25.6152 6.71744 26.0974 6.71744H51.8754C53.2839 6.71744 54.4141 7.88278 54.3705 9.2899L53.4188 40.0441C53.3812 41.261 52.8714 42.4154 51.9974 43.2629C51.1234 44.1104 49.9538 44.5844 48.7364 44.5846H9.26817C8.04813 44.5847 6.87617 44.1089 6.00148 43.2583C5.12679 42.4078 4.61837 41.2496 4.58433 40.0301L3.61157 4.97857L3.61298 4.97998Z"
        fill="url(#paint0_linear_624_87481)"
      />
      <g filter="url(#filter0_d_624_87481)">
        <path
          d="M1.19934 16.0764C1.15951 15.5923 1.22046 15.1052 1.37835 14.6459C1.53623 14.1865 1.78763 13.7649 2.11666 13.4076C2.44569 13.0503 2.84522 12.7651 3.29002 12.57C3.73482 12.3748 4.21525 12.274 4.70097 12.2739H53.2993C53.785 12.274 54.2655 12.3748 54.7103 12.57C55.1551 12.7651 55.5546 13.0503 55.8836 13.4076C56.2127 13.7649 56.4641 14.1865 56.6219 14.6459C56.7798 15.1052 56.8408 15.5923 56.801 16.0764L54.8091 40.2842C54.7127 41.4565 54.179 42.5496 53.3138 43.3465C52.4487 44.1434 51.3155 44.5857 50.1393 44.5857H7.86102C6.68479 44.5857 5.55158 44.1434 4.68645 43.3465C3.82132 42.5496 3.28757 41.4565 3.19123 40.2842L1.19934 16.0764Z"
          fill="url(#paint1_linear_624_87481)"
        />
      </g>
      <path
        opacity="0.5"
        d="M22.5529 18.8572H9.67518C8.70241 18.8572 7.91382 19.6458 7.91382 20.6185V20.6199C7.91382 21.5927 8.70241 22.3813 9.67518 22.3813H22.5529C23.5257 22.3813 24.3143 21.5927 24.3143 20.6199V20.6185C24.3143 19.6458 23.5257 18.8572 22.5529 18.8572Z"
        fill="#EBC350"
      />
      <defs>
        <filter
          id="filter0_d_624_87481"
          x="1.1875"
          y="12.2739"
          width="55.6252"
          height="32.562"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.250217" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_624_87481"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_624_87481"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_624_87481"
          x1="33.2918"
          y1="2.41455"
          x2="33.2918"
          y2="44.5846"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFCA41" />
          <stop offset="1" stop-color="#FFAB5E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_624_87481"
          x1="4.10214"
          y1="9.92357"
          x2="61.5944"
          y2="44.1077"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFDF7D" />
          <stop offset="1" stop-color="#FFDA86" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const RestoreIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2-5V9h8v10H8v-5zm2 4h4v-4h2l-4-4-4 4h2z" />
    </svg>
  );
};

export const SearchIcon = (props: IProps) => {
  const { className, stroke } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.7138 6.8382C18.1647 9.28913 18.1647 13.2629 15.7138 15.7138C13.2629 18.1647 9.28913 18.1647 6.8382 15.7138C4.38727 13.2629 4.38727 9.28913 6.8382 6.8382C9.28913 4.38727 13.2629 4.38727 15.7138 6.8382"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 19L15.71 15.71"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ShareIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0816 8.94973C6.19357 9.50138 2.49859 13.6347 2.49603 18.5537V19.166C4.62041 16.6068 7.75609 15.1026 11.0816 15.0473V18.2756C11.0817 18.744 11.3495 19.1712 11.771 19.3755C12.1925 19.5797 12.6937 19.5252 13.0614 19.235L21.0548 12.9234C21.3386 12.6997 21.5042 12.3583 21.5042 11.997C21.5042 11.6357 21.3386 11.2943 21.0548 11.0706L13.0614 4.75899C12.6937 4.46881 12.1925 4.41426 11.771 4.61853C11.3495 4.8228 11.0817 5.24997 11.0816 5.71839V8.94973Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const StarIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.73124 20.8327C7.22417 21.0974 6.61072 21.0508 6.14946 20.7125C5.68819 20.3743 5.45933 19.8032 5.55933 19.24L6.36867 14.6011L2.96125 11.3357C2.54475 10.9385 2.39211 10.3381 2.56835 9.79024C2.74458 9.24236 3.21864 8.84354 3.7886 8.76365L8.51957 8.08737L10.6555 3.8266C10.9087 3.31561 11.4297 2.99233 12 2.99233C12.5703 2.99233 13.0913 3.31561 13.3446 3.8266L15.4805 8.08737L20.2114 8.76365C20.7814 8.84354 21.2555 9.24236 21.4317 9.79024C21.6079 10.3381 21.4553 10.9385 21.0388 11.3357L17.6314 14.6011L18.4407 19.241C18.5407 19.8042 18.3118 20.3753 17.8506 20.7135C17.3893 21.0518 16.7759 21.0984 16.2688 20.8337L12 18.6278L7.73124 20.8327Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const StepperIcon = (props: IProps) => {
  const { className, fill } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 25"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 12.5C0.75 6.2868 5.7868 1.25 12 1.25C18.2132 1.25 23.25 6.2868 23.25 12.5C23.25 18.7132 18.2132 23.75 12 23.75C5.7868 23.75 0.75 18.7132 0.75 12.5Z"
        fill="#F6F7F8"
      />
      <path
        d="M0.75 12.5C0.75 6.2868 5.7868 1.25 12 1.25C18.2132 1.25 23.25 6.2868 23.25 12.5C23.25 18.7132 18.2132 23.75 12 23.75C5.7868 23.75 0.75 18.7132 0.75 12.5Z"
        stroke="#E2E6E9"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12.5" r="4" fill="#CED4D9" />
    </svg>
  );
};

export const TickIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12.5C0 5.87258 5.37258 0.5 12 0.5C18.6274 0.5 24 5.87258 24 12.5C24 19.1274 18.6274 24.5 12 24.5C5.37258 24.5 0 19.1274 0 12.5Z"
        fill="#7446B2"
      />
      <path
        d="M17.3853 8.41155L10.3047 16.9867C9.83335 17.5576 8.93517 17.4747 8.57625 16.8272L6.60499 13.2712C6.18297 12.5099 7.12541 11.7275 7.79607 12.2824L9.50011 13.6922C9.70138 13.8587 9.99446 13.852 10.1879 13.6764L16.7032 7.76071C17.1374 7.36643 17.7588 7.95927 17.3853 8.41155Z"
        fill="white"
      />
    </svg>
  );
};

export const SupportIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 17H18C17.448 17 17 16.552 17 16V11C17 10.448 17.448 10 18 10H19C20.105 10 21 10.895 21 12V15C21 16.105 20.105 17 19 17Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 17H5C3.895 17 3 16.105 3 15V12C3 10.895 3.895 10 5 10H6C6.552 10 7 10.448 7 11V16C7 16.552 6.552 17 6 17Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 10V9.5C18.5 5.91 15.59 3 12 3V3C8.41 3 5.5 5.91 5.5 9.5V10"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.625 21.25H11.375C10.685 21.25 10.125 20.69 10.125 20V20C10.125 19.31 10.685 18.75 11.375 18.75H12.625C13.315 18.75 13.875 19.31 13.875 20V20C13.875 20.69 13.315 21.25 12.625 21.25Z"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.875 20H16C17.105 20 18 19.105 18 18V17"
        stroke="#1B1B1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const KeyIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor;"
        d="M21 18h-6v-3h-1.7c-1.1 2.4-3.6 4-6.3 4c-3.9 0-7-3.1-7-7s3.1-7 7-7c2.7 0 5.2 1.6 6.3 4H24v6h-3zm-4-2h2v-3h3v-2H11.9l-.2-.7C11 8.3 9.1 7 7 7c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.1 0 4-1.3 4.7-3.3l.2-.7H17zM7 15c-1.7 0-3-1.3-3-3s1.3-3 3-3s3 1.3 3 3s-1.3 3-3 3m0-4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1"
      ></path>
    </svg>
  );
};

export const ThemeIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 4.05C0 1.81325 1.81325 0 4.05 0C6.28675 0 8.1 1.81325 8.1 4.05V6.75C8.1 7.06387 8.1 7.2208 8.0655 7.34955C7.97188 7.69896 7.69896 7.97188 7.34955 8.0655C7.2208 8.1 7.06387 8.1 6.75 8.1H4.05C1.81325 8.1 0 6.28675 0 4.05Z"
        fill="#9AA6B1"
      />
      <path
        d="M9.9 11.25C9.9 10.9361 9.9 10.7792 9.9345 10.6504C10.0281 10.301 10.301 10.0281 10.6504 9.9345C10.7792 9.9 10.9361 9.9 11.25 9.9H13.95C16.1868 9.9 18 11.7132 18 13.95C18 16.1868 16.1868 18 13.95 18C11.7132 18 9.9 16.1868 9.9 13.95V11.25Z"
        fill="#9AA6B1"
      />
      <path
        d="M0 13.95C0 11.7132 1.81325 9.9 4.05 9.9H6.48C7.04705 9.9 7.33058 9.9 7.54717 10.0104C7.73768 10.1074 7.89257 10.2623 7.98964 10.4528C8.1 10.6694 8.1 10.9529 8.1 11.52V13.95C8.1 16.1868 6.28675 18 4.05 18C1.81325 18 0 16.1868 0 13.95Z"
        fill="#9AA6B1"
      />
      <path
        d="M9.9 4.05C9.9 1.81325 11.7132 0 13.95 0C16.1868 0 18 1.81325 18 4.05C18 6.28675 16.1868 8.1 13.95 8.1H11.0571C10.9228 8.1 10.8556 8.1 10.7991 8.09363C10.3297 8.04074 9.95926 7.67028 9.90637 7.20086C9.9 7.14436 9.9 7.07719 9.9 6.94286V4.05Z"
        fill="#9AA6B1"
      />
    </svg>
  );
};

export const UserIcon = (props: IProps) => {
  const { className, fill } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.1109 11.3891C9.14235 12.4205 10.5413 13 12 13C13.4587 13 14.8576 12.4205 15.8891 11.3891C16.9205 10.3576 17.5 8.95869 17.5 7.5C17.4974 6.04212 16.917 4.64471 15.8862 3.61383C14.8553 2.58295 13.4579 2.00264 12 2C10.5421 2.00264 9.14471 2.58295 8.11383 3.61383C7.08295 4.64471 6.50264 6.04212 6.5 7.5C6.5 8.95869 7.07945 10.3576 8.1109 11.3891ZM9.52515 5.02515C10.1815 4.36877 11.0717 4 12 4C12.9283 4 13.8185 4.36877 14.4749 5.02515C15.1312 5.68152 15.5 6.57174 15.5 7.5C15.5 8.42826 15.1312 9.31854 14.4749 9.97491C13.8185 10.6313 12.9283 11 12 11C11.0717 11 10.1815 10.6313 9.52515 9.97491C8.86877 9.31854 8.5 8.42826 8.5 7.5C8.5 6.57174 8.86877 5.68152 9.52515 5.02515ZM19.2929 21.7071C19.4804 21.8946 19.7348 22 20 22C20.2652 22 20.5196 21.8946 20.7071 21.7071C20.8946 21.5196 21 21.2652 21 21V19C21 16.65 16.26 15 12 15C7.74 15 3 16.65 3 19V21C3 21.2652 3.10537 21.5196 3.29291 21.7071C3.48044 21.8946 3.73478 22 4 22C4.26522 22 4.51956 21.8946 4.70709 21.7071C4.89463 21.5196 5 21.2652 5 21V19.06C5.2 18.46 7.92 17 12 17C16.08 17 18.8 18.46 19 19V21C19 21.2652 19.1054 21.5196 19.2929 21.7071Z"
        fill={fill}
      />
    </svg>
  );
};

export const UserGroupIcon = (props: IProps) => {
  const { className, fill } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
      />
    </svg>
  );
};

export const VisibleIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.77294 17.7784C7.56146 19.1607 9.74306 19.9387 12.0026 20C14.2622 19.9387 16.4438 19.1607 18.2324 17.7784C20.0209 16.3962 21.3237 14.4812 21.9527 12.31C22.0228 12.1127 22.0228 11.8973 21.9527 11.7C21.3241 9.52779 20.0217 7.61144 18.2333 6.22748C16.4449 4.84351 14.2631 4.06348 12.0026 4C9.7422 4.06348 7.56037 4.84351 5.772 6.22748C3.98362 7.61144 2.68119 9.52779 2.05263 11.7C1.98246 11.8973 1.98246 12.1127 2.05263 12.31C2.68158 14.4812 3.98443 16.3962 5.77294 17.7784ZM7.07796 16.2634C5.65575 15.1887 4.60217 13.699 4.06264 12C4.60346 10.3018 5.65737 8.81291 7.07931 7.7384C8.50124 6.66389 10.2213 6.05656 12.0026 6C13.784 6.05656 15.5041 6.66389 16.926 7.7384C18.3479 8.81291 19.4018 10.3018 19.9426 12C19.4031 13.699 18.3495 15.1887 16.9273 16.2634C15.5051 17.3381 13.7844 17.9449 12.0026 18C10.2209 17.9449 8.50017 17.3381 7.07796 16.2634ZM8.82071 15.182C9.66462 16.0259 10.8092 16.5 12.0027 16.5C13.1962 16.5 14.3407 16.0259 15.1847 15.182C16.0286 14.3381 16.5027 13.1935 16.5027 12C16.5 10.8073 16.0251 9.66426 15.1818 8.82092C14.3384 7.97758 13.1953 7.50264 12.0027 7.5C10.81 7.50264 9.66695 7.97758 8.82361 8.82092C7.98027 9.66426 7.50533 10.8073 7.50269 12C7.50269 13.1935 7.9768 14.3381 8.82071 15.182ZM10.2378 10.2352C10.7061 9.7669 11.3405 9.50263 12.0027 9.5C12.6649 9.50263 13.2993 9.7669 13.7675 10.2352C14.2358 10.7034 14.5001 11.3378 14.5027 12C14.5027 12.663 14.2393 13.2989 13.7704 13.7678C13.3016 14.2366 12.6657 14.5 12.0027 14.5C11.3396 14.5 10.7038 14.2366 10.2349 13.7678C9.76608 13.2989 9.50269 12.663 9.50269 12C9.50532 11.3378 9.76955 10.7034 10.2378 10.2352Z"
        fill="black"
      />
    </svg>
  );
};

export const XIcon = (props: IProps) => {
  const { className, fill } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.61688 17.4216C7.73872 17.4713 7.86919 17.4965 8.00079 17.4958C8.1324 17.4965 8.26287 17.4713 8.3847 17.4216C8.50654 17.3718 8.61734 17.2985 8.71078 17.2058L12.5008 13.4158L16.2908 17.2058C16.3842 17.2985 16.495 17.3718 16.6169 17.4216C16.7387 17.4713 16.8692 17.4965 17.0008 17.4958C17.1324 17.4965 17.2629 17.4713 17.3847 17.4216C17.5065 17.3718 17.6173 17.2985 17.7108 17.2058C17.897 17.0184 18.0016 16.765 18.0016 16.5008C18.0016 16.2366 17.897 15.9831 17.7108 15.7958L13.9158 12.0008L17.7108 8.20581C17.897 8.01845 18.0016 7.76498 18.0016 7.50079C18.0016 7.23661 17.897 6.98314 17.7108 6.79578C17.6178 6.70205 17.5072 6.62767 17.3854 6.5769C17.2635 6.52614 17.1328 6.5 17.0008 6.5C16.8688 6.5 16.7381 6.52614 16.6162 6.5769C16.4944 6.62767 16.3838 6.70205 16.2908 6.79578L12.5008 10.5858L8.71078 6.79578C8.61782 6.70205 8.50724 6.62767 8.38538 6.5769C8.26352 6.52614 8.13281 6.5 8.00079 6.5C7.86878 6.5 7.73807 6.52614 7.61621 6.5769C7.49435 6.62767 7.38376 6.70205 7.2908 6.79578C7.10455 6.98314 7 7.23661 7 7.50079C7 7.76498 7.10455 8.01845 7.2908 8.20581L11.0858 12.0008L7.2908 15.7958C7.10455 15.9831 7 16.2366 7 16.5008C7 16.765 7.10455 17.0184 7.2908 17.2058C7.38424 17.2985 7.49504 17.3718 7.61688 17.4216Z"
        fill={fill}
      />
    </svg>
  );
};
