import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';

export const PageAnimations =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({ position: 'absolute', height: '100%' })
      ], { optional: true }),
      query(':enter', [
        style({ left: 0, top: 0, right: 'unset', bottom: 'unset', transform: 'scale(0)' })
      ], { optional: true }),
      query(':leave', [
        style({ left: 'unset', top: 'unset', right: 0, bottom: 0, transform: 'scale(1)' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('.5s ease-out', style({ transform: 'scale(0)'}))
        ], { optional: true }),
        query(':enter', [
          animate('.5s ease-out', style({ transform: 'scale(1)' }))
        ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ])
  ]);
