import React, { FC, useCallback, MouseEvent, TouchEvent } from 'react';
import styled from '@emotion/styled';
import { SplitType } from './types';

const Wrapper = styled.div`
  background: #000;
  opacity: 0.2;
  z-index: 1;
  box-sizing: border-box;
  background-clip: padding-box;

  :hover {
    transition: all 2s ease;
  }
`;

const HorizontalWrapper = styled(Wrapper)`
  height: 11px;
  margin: -5px 0;
  border-top: 5px solid rgba(255, 255, 255, 0);
  border-bottom: 5px solid rgba(255, 255, 255, 0);
  cursor: row-resize;
  width: 100%;

  :hover {
    border-top: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
  }

  .disabled {
    cursor: not-allowed;
  }
  .disabled:hover {
    border-color: transparent;
  }
`;

const VerticalWrapper = styled(Wrapper)`
  width: 11px;
  margin: 0 -5px;
  border-left: 5px solid rgba(255, 255, 255, 0);
  border-right: 5px solid rgba(255, 255, 255, 0);
  cursor: col-resize;

  :hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }
  .disabled {
    cursor: not-allowed;
  }
  .disabled:hover {
    border-color: transparent;
  }
`;

interface IResizer {
  index: number;
  split: SplitType;
  onMouseDown: (event: MouseEvent, index: number) => void;
  onTouchStart: (event: TouchEvent, index: number) => void;

  style?: React.CSSProperties;
  className?: string;
}
export const Resizer: FC<IResizer> = (props: IResizer) => {
  const { index, split, onMouseDown, onTouchStart, style, className } = props;

  const onMouseDownHandler = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!onMouseDown) {
      return;
    }
    event.preventDefault();
    onMouseDown(event, index);
  }, []);
  const onTouchEndHandler = useCallback((event: TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);
  const onTouchStartHandler = useCallback((event: TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    onTouchStart(event, index);
  }, []);

  const wrapper = {
    'data-attribute': split,
    'data-type': 'Resizer',
    onMouseDown: onMouseDownHandler,
    onTouchEnd: onTouchEndHandler,
    onTouchStart: onTouchStartHandler,
    className,
    style
  };

  return split === 'vertical' ? <VerticalWrapper {...wrapper} /> : <HorizontalWrapper {...wrapper} />;
};
