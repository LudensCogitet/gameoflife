import React, {Component} from 'react';
import Square from './Square';

function Row(props){
    return (
      <div style={{marginLeft: 15}}>
        {props.squares.map((e,i) => {return (<Square key={i}
                                                     alive={e.alive}
                                                     pos={[i,props.y]}
                                                     size={props.cellSize}
                                                     border={props.cellBorder}
                                                     checkCell={props.checkCell} />);})}
      </div>
    );
}

export default Row;
