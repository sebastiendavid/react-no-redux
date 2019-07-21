import React from 'react';
import logger from '../../core/logger';
import CatActions from './actions';
import CatTitle from './title';

export default function Cat() {
  logger.info('render Cat');
  return (
    <>
      <CatTitle />
      <CatActions />
    </>
  );
}
