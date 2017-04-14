import { trigger, transition, state, style, animate } from '@angular/animations';

export const animations = [trigger('hover', [
  state('off', style({
    transform: 'scale(1)'
  })),
  state('on', style({
    transform: 'scale(1.05)'
  })),
  transition('off => on', animate('100ms ease-in')),
  transition('on => off', animate('100ms ease-out'))
]),
]