import React from 'react';
import logger from '../core/logger';
import makeModule from '../core/module';
import Dog from './components';
import { Provider } from './context';
import reducer from './reducer';
import saga from './saga';

const Module = makeModule({
  name: 'dog',
  Provider,
  reducer,
  saga,
});

export default function DogModule() {
  logger.info('render DogModule');
  return (
    <Module>
      <Dog />
    </Module>
  );
}
