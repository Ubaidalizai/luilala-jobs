import React from 'react';
import { CSSTransition } from 'react-transition-group';

const TransitionWrapper = ({ children, classNames, timeout }) => {
  return (
    <CSSTransition
      in={true}
      timeout={timeout}
      classNames={classNames}
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default TransitionWrapper;