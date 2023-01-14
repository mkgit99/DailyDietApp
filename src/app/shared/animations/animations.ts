import { trigger, sequence, state, animate, transition, style } from '@angular/animations';

export const fadeOut = trigger('fadeOut', [
    state(
        'void',
        style({
            borderBottomColor: 'grey',
            opacity: 0,
            transform: 'translateY(-550px)',
            'box-shadow': 'none',
        })
    ),
    transition('void => *', sequence([animate('.5s ease')])),
]);
