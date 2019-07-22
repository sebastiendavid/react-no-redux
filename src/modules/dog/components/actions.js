import React from 'react';
import makeAction from '../../core/action';
import logger from '../../core/logger';
import { connect } from '../context';

export default connect(
  {
    actions: {
      decrement: makeAction('decrement'),
      increment: makeAction('increment'),
      incrementBy: makeAction('increment_by'),
      reset: makeAction('reset'),
      noop: makeAction('noop'),
    },
  },
  function DogActions({ actions }) {
    logger.info('render DogActions');
    return (
      <>
        <button onClick={() => actions.decrement()}>Decrement</button>
        <button onClick={() => actions.increment()}>Incremment</button>
        <button onClick={() => actions.incrementBy(5)}>Incremment by 5</button>
        <button onClick={() => actions.reset()}>Reset</button>
        <button onClick={() => actions.noop()}>Noop</button>
      </>
    );
  }
);
