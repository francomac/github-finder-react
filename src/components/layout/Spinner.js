import React, { Fragment } from 'react';
import spinner from './lego-optimised.gif';

export const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt=''
    />
  </Fragment>
);
