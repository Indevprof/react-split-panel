import React, { FC, useState, PropsWithChildren, useEffect, useCallback, useRef } from 'react';
import EventListener, { withOptions } from 'react-event-listener';
import styled from '@emotion/styled';
import { calculateSizes, getDimensionsSnapshot, getPanePropSize } from './utils';
import isEqual from 'lodash/isEqual';
import { IDimensionsSnapshot, ISplitPanel } from './types';
import { ISplitPanelChildren, SplitPanelChildren } from './SplitPaneChildren';

const ColumnStyle = styled.div({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  flex: 1,
  outline: 'none',
  overflow: 'hidden',
  userSelect: 'text',
});

const RowStyle = styled.div({
  display: 'flex',
  height: '100%',
  flexDirection: 'row',
  flex: 1,
  outline: 'none',
  overflow: 'hidden',
  userSelect: 'text',
});

export const SplitPanel: FC<ISplitPanel> = (props: PropsWithChildren<ISplitPanel>) => {
  const { children, onResizeEnd, disallowResize, onResizeStart, split, resizerSize, onChange, className, style, resizerClassName, resizerStyle } = props;

  const paneElementsRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    paneElementsRef.current = paneElementsRef.current.slice(0, React.Children.count(children));
  }, [children]);

  const splitPaneRef = useRef<HTMLDivElement>(null);

  const [sizes, setSizes] = useState<string[]>([]);
  const [enableListen, setEnableListen] = useState<boolean>(false);
  const [resizerIndex, setResizerIndex] = useState<number>(0);
  const [dimensionsSnapshot, setDimensionsSnapshot] = useState<IDimensionsSnapshot>();
  const [startClientX, setStartClientX] = useState<number>(0);
  const [startClientY, setStartClientY] = useState<number>(0);

  const onDown = useCallback(
    (resizerIndex: number, clientX: number, clientY: number) => {
      if (disallowResize || !splitPaneRef.current) {
        return;
      }

      setResizerIndex(resizerIndex);

      const snapshot = getDimensionsSnapshot(children, resizerSize, split, paneElementsRef.current, splitPaneRef.current);
      setDimensionsSnapshot(snapshot);

      setStartClientX(clientX);
      setStartClientY(clientY);

      setEnableListen(true);

      if (onResizeStart) {
        onResizeStart();
      }
    },
    [
      children,
      resizerSize,
      split,
      paneElementsRef.current,
      splitPaneRef.current,
      disallowResize,
      onResizeStart,
      setDimensionsSnapshot,
      setStartClientX,
      setStartClientY,
      setEnableListen,
    ]
  );

  const onMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!dimensionsSnapshot) {
        return;
      }
      const newSizes = calculateSizes({ clientX, clientY, startClientX, dimensionsSnapshot, resizerIndex, sizes, split, startClientY });

      onChange && onChange(newSizes);
      setSizes(newSizes);
    },
    [split, onChange, startClientX, dimensionsSnapshot, resizerIndex, sizes, split, startClientY, setSizes]
  );

  const onMouseUp = useCallback(
    (event) => {
      event.preventDefault();

      setEnableListen(false);

      if (onResizeEnd) {
        onResizeEnd(sizes);
      }
    },
    [sizes, setEnableListen, onResizeEnd]
  );

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();

      onMove(event.clientX, event.clientY);
    },
    [onMove]
  );

  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();

      const { clientX, clientY } = event.touches[0];

      onMove(clientX, clientY);
    },
    [onMove]
  );

  const onResizerMouseDown = useCallback(
    (event: React.MouseEvent, resizerIndex: number) => {
      if (event.button !== 0) {
        return;
      }

      event.preventDefault();
      onDown(resizerIndex, event.clientX, event.clientY);
    },
    [onDown]
  );

  const onResizerTouchStart = useCallback(
    (event: React.TouchEvent, resizerIndex: number) => {
      event.preventDefault();

      const { clientX, clientY } = event.touches[0];
      onDown(resizerIndex, clientX, clientY);
    },
    [onDown]
  );

  useEffect(() => {
    const newSizes = getPanePropSize(children);
    if (!isEqual(sizes, newSizes)) {
      setSizes(newSizes);
    }
  }, [setSizes, getPanePropSize, children]);

  const splitPaneChildren: ISplitPanelChildren = {
    onResizerMouseDown,
    onResizerTouchStart,
    paneElementsRef,
    resizerSize,
    sizes,
    split,
    resizerClassName,
    resizerStyle
  };

  const StyleComponent = split === 'vertical' ? RowStyle : ColumnStyle;

  return (
    <>
      {enableListen && (
        <EventListener
          target={document}
          onMouseUp={withOptions(onMouseUp, { passive: false })}
          onMouseMove={withOptions(onMouseMove, { passive: false })}
          onTouchMove={withOptions(onTouchMove, { passive: false })}
          onTouchEnd={withOptions(onMouseUp, { passive: false })}
          onTouchCancel={withOptions(onMouseUp, { passive: false })}
        />
      )}

      <StyleComponent className={className} style={style} data-type="SplitPane" data-split={split} ref={splitPaneRef}>
        <SplitPanelChildren {...splitPaneChildren}>{children}</SplitPanelChildren>
      </StyleComponent>
    </>
  );
};
