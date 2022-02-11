import React, { FC, forwardRef, PropsWithChildren } from 'react';
import { SplitType } from './types';
import { convertSizeToCssValue, getUnit } from './utils';

const paneStyle = (props: IPane): { [key: string]: any } => {
  const { __internal, initialSize, minSize, maxSize, } = props;

  if (!__internal) {
    throw new Error("__internal is null");
  }

  const { split, size,  resizersSize } = __internal;

  const value = size ?? initialSize ?? "1";
  const vertical = split === 'vertical';
  const styleProp = {
    minSize: vertical ? 'minWidth' : 'minHeight',
    maxSize: vertical ? 'maxWidth' : 'maxHeight',
    size: vertical ? 'width' : 'height',
  };

  const style: { [key: string]: any } = {
    display: 'flex',
    outline: 'none',
  };

  style[styleProp.minSize] = minSize && convertSizeToCssValue(minSize, resizersSize);
  style[styleProp.maxSize] = maxSize && convertSizeToCssValue(maxSize, resizersSize);

  switch (getUnit(value)) {
    case 'ratio':
      style.flex = value;
      break;
    case '%':
    case 'px':
      style.flexGrow = 0;
      style[styleProp.size] = convertSizeToCssValue(value, resizersSize);
      break;
  }

  return style;
};

export interface IPane {
  initialSize?: string;
  className?: string;
  minSize?: string;
  maxSize?: string;

  __internal?: IPaneStyle;
}

export interface IPaneStyle {
  split: SplitType;
  size: string;
  resizersSize: number;
}

export const Pane: FC<IPane> = forwardRef((props: PropsWithChildren<IPane>, ref: React.Ref<HTMLDivElement>) => {
  const { children, className } = props;
  const prefixedStyle = paneStyle(props);

  return (
    <div className={className} style={prefixedStyle} ref={ref}>
      {children}
    </div>
  );
});