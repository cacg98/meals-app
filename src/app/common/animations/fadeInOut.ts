import {
  trigger,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
  transition(':enter', [
    animate(
      '250ms',
      keyframes([
        style({
          opacity: 0,
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 1,
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ]),
  transition(':leave', [
    animate(
      '250ms',
      keyframes([
        style({
          opacity: 1,
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 0,
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ]),
]);
