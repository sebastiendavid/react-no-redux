import React from 'react';
import logger from '../../core/logger';
import { connect } from '../context';

export default connect(
  {
    count: state => state.count,
  },
  function DogTitle({ count }) {
    logger.info('render DogTitle');
    return <h1>Dog {count}</h1>;
  }
);
