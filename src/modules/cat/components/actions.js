import React from 'react';
import { action } from '../../core/action';
import logger from '../../core/logger';
import { connect } from '../context';

export default connect(
  {
    actions: {
      decrement: action('decrement'),
      increment: action('increment'),
      reset: action('reset'),
      noop: action('noop'),
    },
  },
  function CatActions({ actions }) {
    logger.info('render CatActions');
    return (
      <>
        <button onClick={() => actions.decrement()}>Decrement</button>
        <button onClick={() => actions.increment()}>Incremment</button>
        <button onClick={() => actions.reset()}>Reset</button>
        <button onClick={() => actions.noop()}>Noop</button>
      </>
    );
  }
);
