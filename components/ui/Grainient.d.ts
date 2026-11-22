import React from 'react';

export interface GrainientProps {
  colors?: string[];
  type?: 'linear' | 'radial';
  angle?: number;
  bands?: number;
  softness?: number;
  flow?: number;
  scale?: number;
  speed?: number;
  silk?: number;
  grainAmount?: number;
  grainSize?: number;
  grainAnimated?: boolean;
  contrast?: number;
  saturation?: number;
  variation?: number;
  interactive?: boolean;
  stir?: number;
  clickSwirl?: boolean;
  intro?: boolean;
  lightMode?: boolean;
  dpr?: number;
  className?: string;
  style?: React.CSSProperties;
}

declare const Grainient: React.FC<GrainientProps>;
export default Grainient;
