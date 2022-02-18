import React, { cloneElement, FC, PropsWithChildren, useMemo } from 'react';

import { Resizer } from './Resizer';
import { Pane, IPane } from './Pane';
import { SplitType } from './types';
import { getResizersSize, removeNullChildren } from './utils';

export interface ISplitPanelChildren {
  sizes: string[];
  resizerSize: number;
  split: SplitType;
  paneElementsRef: React.MutableRefObject<Element[]>;
  onResizerMouseDown: (event: React.MouseEvent, resizerIndex: number) => void;
  onResizerTouchStart: (event: React.TouchEvent, resizerIndex: number) => void;

  resizerStyle?: React.CSSProperties;
  resizerClassName?: string;
}
export const SplitPanelChildren: FC<ISplitPanelChildren> = (props: PropsWithChildren<ISplitPanelChildren>) => {
  const { children, sizes, resizerSize, split, paneElementsRef, onResizerMouseDown, onResizerTouchStart, resizerStyle, resizerClassName } = props;

  const notNullChildren = useMemo(() => removeNullChildren(children), [children]);

  const paneStyleProps: IPane[] = useMemo(() => {
    const resizersSize = getResizersSize(notNullChildren, resizerSize);

    return notNullChildren.map((child, idx) => ({
      ...child.props,
      key: `Pane-${idx}`,
      'data-type': 'Pane',
      ref: (el: Element) => (paneElementsRef.current[idx] = el),
      __internal: {
        split: split,
        resizersSize,
        size: sizes[idx],
      },
    }));
  }, [split, resizerSize, sizes, paneElementsRef, notNullChildren]);

  const resizerProps = {
    split,
    onMouseDown: onResizerMouseDown,
    onTouchStart: onResizerTouchStart,
    style: resizerStyle,
    className: resizerClassName,
  };

  return (
    <>
      {paneStyleProps.map((pane, idx) => {
        const child = notNullChildren[idx];
        return (
          <>
            {idx !== 0 && <Resizer index={idx - 1} key={`Resizer-${idx - 1}`} {...resizerProps} />}
            <React.Fragment key={`Pane-${idx}`}>{
            child.type === Pane ? cloneElement(child, pane) : <Pane {...pane}>{child}</Pane>}
            </React.Fragment>
          </>
        );
      })}
    </>
  );
};
