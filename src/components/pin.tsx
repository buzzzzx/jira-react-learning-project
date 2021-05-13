import React from "react";
import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin = (props: PinProps) => {
  const { checked, onCheckedChange, ...restProps } = props;
  return (
    <Rate
      value={checked ? 1 : 0}
      count={1}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};
