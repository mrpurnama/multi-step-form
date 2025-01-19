import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const stepAnimation = trigger('stepAnimation', [
  transition('* <=> *', [ // Transition between any state to any state
    query(':enter', [
      style({ opacity: 0}), // Initial style of entering step
      stagger(100, [ // Stagger animation for elements within the step
        animate('500ms ease-out', style({ opacity: 1})) // Final style
      ])
    ], { optional: true }),
    // query(':leave', [
    //   stagger(100, [
    //     animate('300ms ease-out', style({ opacity: 0}))
    //   ])
    // ], { optional: true })
  ])
]);