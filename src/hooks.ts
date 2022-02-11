import { ISplitPanel } from './types';

export const useSplitPanel = (props: Partial<ISplitPanel>): ISplitPanel => {
  return {
    resizerSize: 1,
    split: 'vertical',
     ...props,
  };
};
