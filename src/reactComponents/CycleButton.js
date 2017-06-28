import React, {Component} from 'react';

class CycleButton extends Component{
  constructor(props){
    super(props);

    this.state ={currentState: props.startingState};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    var newState = this.state.currentState +1;
    if(newState > this.props.states.length -1)
      newState = 0;

    var change = {};
    change[this.props.name] = this.props.states[newState];

    this.props.handleClick(change);
    this.setState({currentState: newState});
  }

  render(){
    return (<a title={this.props.titleText}
               className='pure-menu-link'
               onClick={this.handleClick}>
                {this.props.statesText[this.state.currentState]}
            </a>);
  }
}

export default CycleButton;
