import React, {Component} from 'react';

class Square extends Component{
  constructor(props){
    super(props);

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseClick = this.mouseClick.bind(this);
  }

  mouseOver(e){
    e.preventDefault();
    this.props.checkCell(this.props.pos);
  }

  mouseClick(e){
    e.preventDefault();
    this.props.checkCell(this.props.pos,true);
  }

  shouldComponentUpdate(nextProps,nextState){
    return this.props.alive != nextProps.alive || this.props.border != nextProps.border || this.props.width != this.props.size;
  }

  render(){
    var color = this.props.alive == true ? 'red' : 'white';

    return (<div style={{display: 'inline-block',
                         height: this.props.size,
                         width: this.props.size,
                         border: this.props.border,
                         backgroundColor: color}}
                         onMouseOver={this.mouseOver}
                         onMouseDown={this.mouseClick}
            />);

  }
}

export default Square;
