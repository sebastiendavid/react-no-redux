import React from 'react';
import logger from '../core/logger';
import makeModule from '../core/module';
import Cat from './components';
import { Provider } from './context';
import reducer from './reducer';
import saga from './saga';

const Module = makeModule({
  name: 'cat',
  Provider,
  reducer,
  saga,
});

export default function CatModule() {
  logger.info('render CatModule');
  return (
    <Module>
      <Cat />
    </Module>
  );
}
