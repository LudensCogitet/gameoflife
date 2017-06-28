import React, {Component} from 'react';

class DoubleInput extends Component{
  constructor(props){
    super(props);

    this.state = {width: 0,
                  height: 0};

    this.updateValue = this.updateValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateValue(e){
    var change = {};
    change[e.target.id] = e.target.value;
    this.setState(change);
  }

  handleClick(){
    var change = {};
    change[this.props.name] = {width: this.state.width,
                               height: this.state.height};

    this.props.sendValues(change);
  }

  render(){
    return (
      <div title={this.props.titleText} style={{marginLeft: 5}}>
        <input style={{width: this.props.width, verticalAlign: 'text-bottom'}}
               onChange={this.updateValue}
               id={this.props.firstInputName}
               type='text'
               placeholder={this.props.firstInputName} />
        <input style={{width: this.props.width, verticalAlign: 'text-bottom'}}
               onChange={this.updateValue}
               id={this.props.secondInputName}
               type='text'
               placeholder={this.props.secondInputName} />
        <a style={{display: 'inline-block'}} className='pure-menu-link'
           onClick={this.handleClick}>
            {this.props.buttonText}
        </a>
      </div>);
  }
}

export default DoubleInput;
