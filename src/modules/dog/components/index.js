import React from 'react';
import logger from '../../core/logger';
import DogActions from './actions';
import DogTitle from './title';

export default function Dog() {
  logger.info('render Dog');
  return (
    <>
      <DogTitle />
      <DogActions />
    </>
  );
}
