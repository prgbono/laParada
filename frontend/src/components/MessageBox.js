import React from 'react';

export default function MessageBox(props) {
  //TODO: MaterialUI/AntD Components
  return (
    <div className={`alert alert-${props.variant || 'info'}`}>
      {props.children}
    </div>
  );
}
