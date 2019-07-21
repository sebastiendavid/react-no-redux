import React from 'react';
import logger from '../../core/logger';
import { connect } from '../context';

export default connect(
  {
    count: state => state.count,
    caca: state => state.ca.ca,
  },
  function CatTitle({ count }) {
    logger.info('render CatTitle');
    return <h1>Cat {count}</h1>;
  }
);
