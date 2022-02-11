import React from 'react';
import { ReactElement, ReactNode } from 'react';
import { ICalcilateSizes, IDimensionsSnapshot, SplitType } from './types';

const DEFAULT_PANE_SIZE = '1';
const DEFAULT_PANE_MIN_SIZE = '0';
const DEFAULT_PANE_MAX_SIZE = '100%';

export function getUnit(size: string): string {
  if (size.endsWith('px')) {
    return 'px';
  }

  if (size.endsWith('%')) {
    return '%';
  }

  return 'ratio';
}

export const convertSizeToCssValue = (value: string, resizersSize?: number): string => {
  if (getUnit(value) !== '%') {
    return value;
  }

  if (!resizersSize) {
    return value;
  }

  const idx = value.search('%');
  const percent = +value.slice(0, idx) / 100;
  if (percent === 0) {
    return value;
  }

  return `calc(${value} - ${resizersSize}px*${percent})`;
};

export const convertToUnit = (size: number, unit: string, containerSize: number): string => {
  switch (unit) {
    case '%':
      return `${((size / containerSize) * 100).toFixed(2)}%`;
    case 'px':
      return `${size.toFixed(2)}px`;
    case 'ratio':
      return (size * 100).toFixed(0);
  }

  throw new Error('unit out of bound!');
};

export const removeNullChildren = (children: ReactNode | undefined): ReactElement[] => {
  return React.Children.toArray(children).filter((c) => c) as ReactElement[];
};

export const getPanePropSize = (children: ReactNode | undefined): string[] => {
  return removeNullChildren(children).map((child: ReactElement) => {
    const value = child['props']['size'] ?? child.props['initialSize'];
    return value ?? DEFAULT_PANE_SIZE;
  });
};

export const getPanePropMinMaxSize = (children: ReactNode | undefined, key: string): string[] => {
  return removeNullChildren(children).map((child) => {
    const value = child.props[key];
    if (value === undefined) {
      return key === 'maxSize' ? DEFAULT_PANE_MAX_SIZE : DEFAULT_PANE_MIN_SIZE;
    }

    return value;
  });
};

export const getResizersSize = (children: ReactNode | undefined, resizerSize: number): number => {
  if (!children) {
    return 0;
  }

  return (React.Children.count(children) - 1) * resizerSize;
};

const getPaneDimensions = (paneElements: Element[]) => {
  return paneElements.filter((el) => el).map((el) => el.getBoundingClientRect());
};

export const getDimensionsSnapshot = (
  children: ReactNode | undefined,
  resizerSize: number,
  split: SplitType,
  paneElements: Element[],
  splitPane: Element
): IDimensionsSnapshot => {
  const paneDimensions = getPaneDimensions(paneElements);
  const splitPaneDimensions = splitPane.getBoundingClientRect();
  const minSizes = getPanePropMinMaxSize(children, 'minSize');
  const maxSizes = getPanePropMinMaxSize(children, 'maxSize');

  const notNullChildren = removeNullChildren(children);
  const resizersSize = getResizersSize(notNullChildren, resizerSize);
  const splitPaneSizePx = split === 'vertical' ? splitPaneDimensions.width - resizersSize : splitPaneDimensions.height - resizersSize;

  const minSizesPx = minSizes.map((s) => convert(s, splitPaneSizePx));
  const maxSizesPx = maxSizes.map((s) => convert(s, splitPaneSizePx));
  const sizesPx = paneDimensions.map((d) => (split === 'vertical' ? d.width : d.height));

  return {
    resizersSize,
    paneDimensions,
    splitPaneSizePx,
    minSizesPx,
    maxSizesPx,
    sizesPx,
  };
};

const toPx = (value: number, unit: string, size: number): number => {
  switch (unit) {
    case '%': {
      return +((size * value) / 100).toFixed(2);
    }
    default: {
      return +value;
    }
  }
};

export const convert = (str: string, size: number): number => {
  const tokens = str.match(/([0-9]+)([px|%]*)/);
  if (!tokens) {
    return 0;
  }

  const value = tokens[1];
  const unit = tokens[2];
  return toPx(+value, unit, size);
};

export const calculateSizes = (props: ICalcilateSizes): string[] => {
  const { split, resizerIndex, dimensionsSnapshot, startClientX, startClientY, clientX, clientY, sizes } = props;
  const { sizesPx, minSizesPx, maxSizesPx, splitPaneSizePx, paneDimensions } = dimensionsSnapshot;

  const sizeDim = split === 'vertical' ? 'width' : 'height';

  const primary = paneDimensions[resizerIndex];
  const secondary = paneDimensions[resizerIndex + 1];
  const maxSize = primary[sizeDim] + secondary[sizeDim];

  const primaryMinSizePx = minSizesPx[resizerIndex];
  const secondaryMinSizePx = minSizesPx[resizerIndex + 1];
  const primaryMaxSizePx = Math.min(maxSizesPx[resizerIndex], maxSize);
  const secondaryMaxSizePx = Math.min(maxSizesPx[resizerIndex + 1], maxSize);

  const moveOffset = split === 'vertical' ? startClientX - clientX : startClientY - clientY;

  let primarySizePx = primary[sizeDim] - moveOffset;
  let secondarySizePx = secondary[sizeDim] + moveOffset;

  let primaryHasReachedLimit = false;
  let secondaryHasReachedLimit = false;

  if (primarySizePx < primaryMinSizePx) {
    primarySizePx = primaryMinSizePx;
    primaryHasReachedLimit = true;
  } else if (primarySizePx > primaryMaxSizePx) {
    primarySizePx = primaryMaxSizePx;
    primaryHasReachedLimit = true;
  }

  if (secondarySizePx < secondaryMinSizePx) {
    secondarySizePx = secondaryMinSizePx;
    secondaryHasReachedLimit = true;
  } else if (secondarySizePx > secondaryMaxSizePx) {
    secondarySizePx = secondaryMaxSizePx;
    secondaryHasReachedLimit = true;
  }

  if (primaryHasReachedLimit) {
    secondarySizePx = primary[sizeDim] + secondary[sizeDim] - primarySizePx;
  } else if (secondaryHasReachedLimit) {
    primarySizePx = primary[sizeDim] + secondary[sizeDim] - secondarySizePx;
  }

  sizesPx[resizerIndex] = primarySizePx;
  sizesPx[resizerIndex + 1] = secondarySizePx;

  let newSizes = sizes.concat();
  let updateRatio;

  [primarySizePx, secondarySizePx].forEach((paneSize, idx) => {
    const unit = getUnit(sizes[resizerIndex + idx]);
    if (unit !== 'ratio') {
      newSizes[resizerIndex + idx] = convertToUnit(paneSize, unit, splitPaneSizePx);
    } else {
      updateRatio = true;
    }
  });

  if (updateRatio) {
    let ratioCount = 0;
    let lastRatioIdx = 0;
    newSizes = newSizes.map((size, idx) => {
      if (getUnit(size) === 'ratio') {
        ratioCount++;
        lastRatioIdx = idx;

        return convertToUnit(sizesPx[idx], 'ratio', 0);
      }

      return size;
    });

    if (ratioCount === 1) {
      newSizes[lastRatioIdx] = '1';
    }
  }

  return newSizes;
};
