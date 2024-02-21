import {
  trigger,
  style,
  animate,
  transition,
  keyframes,
  AUTO_STYLE,
} from '@angular/animations';

export const pulseAnimation = trigger('pulse', [
  transition(':enter', [
    animate(
      '250ms',
      keyframes([
        style({
          visibility: AUTO_STYLE,
          transform: 'scale3d(1, 1, 1)',
          easing: 'ease',
          offset: 0,
        }),
        style({
          transform: 'scale3d(1.2, 1.2, 1.2)',
          easing: 'ease',
          offset: 0.5,
        }),
        style({
          transform: 'scale3d(1, 1, 1)',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ]),
]);
