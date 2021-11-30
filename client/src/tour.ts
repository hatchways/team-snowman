import { keyframes } from '@emotion/react';
const radius = 20;

const keyframesRotate = keyframes`
  50% {
    transform: translateY(-10px  );
  }
}`;

export const styles = {
  popover: (base: any) => ({
    ...base,
    '--reactour-accent': '#ef5a3d',
    borderRadius: radius,
  }),
  maskArea: (base: any) => ({ ...base, rx: radius }),
  maskWrapper: (base: any) => ({
    ...base,
    color: '#335599',
  }),
  badge: (base: any) => ({
    ...base,
    left: 'auto',
    right: '-0.8125em',
    backgroundColor: '#e50000',
    color: '#ffffff',
    fontWeight: 900,
  }),
  controls: (base: any) => ({ ...base, marginTop: 100 }),
  close: (base: any) => ({ ...base, right: 'auto', left: 8, top: 8 }),
  dot: (base: any) => ({
    ...base,
    animationDuration: '1s',
    animationName: keyframesRotate,
    animationIterationCount: 'infinite',
    '&:nth-of-type(1)': {
      animationDelay: '.3s',
    },
    '&:nth-of-type(2)': {
      animationDelay: '.6s',
    },
  }),
};
