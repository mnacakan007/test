import { ReactNode } from 'react';

export type StringORNull = string | null;

export interface EnumItem<T> {
  id  : T;
  name: string;
}

export interface IOutsideClickDetectorProps {
  onOutsideClick: (event: MouseEvent) => void;
  children      : ReactNode;
  className?    : string;
}
