import * as React from 'react';

const Card = props => {
  return (
    <div>
      Question: {props.question}
      <button onClick={() => props.next('True')}>True</button>
      <button onClick={() => props.next('False')}>False</button>
    </div>
  );
};

export default Card;
