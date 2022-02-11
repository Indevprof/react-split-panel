export type SplitType = 'vertical' | 'horizontal';

export interface IDimensionsSnapshot {
  resizersSize: number;
  paneDimensions: any[];
  splitPaneSizePx: number;
  minSizesPx: number[];
  maxSizesPx: number[];
  sizesPx: number[];
}

export  interface ICalcilateSizes {
  split: SplitType;
  resizerIndex: number;
  dimensionsSnapshot: IDimensionsSnapshot;
  startClientX: number;
  startClientY: number;
  clientX: number;
  clientY: number;
  sizes: string[];
}

export interface ISplitPanel {
  split: SplitType;
  disallowResize?: boolean;
  resizerSize: number;
  
  className?: string;
  style?: React.CSSProperties;

  onResizeStart?: () => void;
  onChange?: (sizes: string[]) => void;
  onResizeEnd?: (sizes: string[]) => void;

  resizerStyle?: React.CSSProperties;
  resizerClassName?: string;
}