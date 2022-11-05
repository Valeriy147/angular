import { trigger, transition, useAnimation } from '@angular/animations';
import { pulse, fadeIn, slideInLeft, slideInRight } from 'ng-animate';

export const fade = [
  trigger('fade', [transition(':enter', useAnimation(fadeIn))])
]

export const attention = [
  trigger(
    'attention',
    [
      transition('* => *', useAnimation(pulse))
    ])
]

export const slideInL = [
  trigger('slideInL', [transition(':enter', useAnimation(slideInLeft))])
]
export const slideInR = [
  trigger('slideInR', [transition(':enter', useAnimation(slideInRight))])
]
