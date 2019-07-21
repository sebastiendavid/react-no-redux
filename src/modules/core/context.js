import React from 'react';
import makeConnect from './connect';

export default function makeContext() {
  const { Consumer, Provider } = React.createContext();
  return { Consumer, Provider, connect: makeConnect(Consumer) };
}
