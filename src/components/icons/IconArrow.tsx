import React from "react";

type IconArrowProps = React.SVGProps<SVGSVGElement> & {
  width?: number;
  height?: number;
  fill?: string;
};

export const IconArrow = ({
  width = 24,
  height = 24,
  fill = "#1d1f21",
  ...props
}: IconArrowProps) => {
  return (
    <svg
      fill="none"
      height={height}
      width={width}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M12 2 L12 22 M12 2 L7 7 M12 2 L17 7"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
