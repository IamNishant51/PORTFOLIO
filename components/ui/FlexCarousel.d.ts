import React, { CSSProperties } from 'react';

export interface FlexCarouselItem {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

export interface FlexCarouselRef {
  next: () => void;
  prev: () => void;
  step: (delta: number) => void;
  goTo: (index: number) => void;
  openFocus: (index?: number) => void;
  closeFocus: () => void;
  toggleFocus: (index?: number) => void;
  isFocusOpen: () => boolean;
}

export interface FlexCarouselProps {
  items?: FlexCarouselItem[];
  preset?: 'liquid' | 'ribbon' | 'vortex' | 'arch';
  intro?: 'rise' | 'bloom' | 'spin' | 'deal' | 'none';
  cardHeight?: number;
  gap?: number;
  radius?: number;
  fit?: 'natural' | 'portrait' | 'square' | 'landscape';
  lensWidth?: number;
  lensHeight?: number;
  tilt?: number;
  roundness?: number;
  bend?: number;
  reach?: number;
  curl?: 'twist' | 'rise' | 'fall';
  dispersion?: number;
  liquid?: number;
  followCursor?: boolean;
  squeeze?: number;
  focusOnClick?: boolean;
  autoplay?: boolean;
  autoSpeed?: number;
  interval?: number;
  captions?: boolean;
  captureWheel?: boolean;
  hideFocusedCard?: boolean;
  onChange?: (index: number, item: FlexCarouselItem) => void;
  onSelect?: (index: number, item: FlexCarouselItem) => void;
  onFocusChange?: (isOpen: boolean, index: number) => void;
  className?: string;
  style?: CSSProperties;
}

declare const FlexCarousel: React.ForwardRefExoticComponent<
  FlexCarouselProps & React.RefAttributes<FlexCarouselRef>
>;
export default FlexCarousel;
