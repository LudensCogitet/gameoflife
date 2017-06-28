import React, {Component} from 'react';
import DoubleInput from './DoubleInput';
import CycleButton from './CycleButton';

class GoLConsole extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
       return (
         <div style={{cursor: 'pointer', userSelect: 'none'}} className="pure-menu pure-menu-horizontal">
          <a style={{cursor: 'default', minWidth: 170}} className="pure-menu-heading">Generations: {this.props.generations}</a>
          <ul className="pure-menu-list">
              <li className="pure-menu-item"><a title='Play/Pause'
                                                className='pure-menu-link'
                                                onClick={this.props.run}>{this.props.running ?
                                                                          <i className='material-icons'>pause</i> :
                                                                          <i className='material-icons'>play_arrow</i>}</a>
              </li>
              <li className="pure-menu-item"><a title='Step' className='pure-menu-link' onClick={this.props.tick}><i className='material-icons'>skip_next</i></a></li>
              <li className="pure-menu-item"> <CycleButton name={'gameSpeed'}
                                                           titleText={'Game Speed'}
                                                           startingState={1}
                                                           states={['slow', 'fast']}
                                                           statesText={[<i className='material-icons'>add</i>, <i className='material-icons'>remove</i>]}
                                                           handleClick={this.props.consoleCommand} /></li>
              <li className="pure-menu-item"><a title='Clear Board' className='pure-menu-link' onClick={this.props.clear}> <i className='material-icons'>clear</i></a></li>
              <li className="pure-menu-item"><a title='Randomize' className='pure-menu-link' onClick={this.props.randomFill}> <i className='material-icons'>loop</i></a></li>
              <li className="pure-menu-item"><CycleButton name={'cellBorders'}
                                                          titleText={'Add/Remove Borders'}
                                                          startingState={0}
                                                          states={[true,false]}
                                                          statesText={[<i className='material-icons'>border_clear</i>,<i className='material-icons'>border_all</i>]}
                                                          handleClick={this.props.consoleCommand} /></li>
              <li className="pure-menu-item"> <CycleButton name={'cellSize'}
                                                           titleText={'Cell Size'}
                                                           startingState={1}
                                                           states={['small', 'large']}
                                                           statesText={[<i className='material-icons'>view_module</i>, <i className='material-icons'>view_comfy</i>]}
                                                           handleClick={this.props.consoleCommand} /></li>
              <li className="pure-menu-item"><DoubleInput name={'boardSize'}
                                                          titleText={'Change Board Size'}
                                                          width={'5em'}
                                                          sendValues={this.props.consoleCommand}
                                                          firstInputName={'width'}
                                                          secondInputName={'height'}
                                                          buttonText={<i className='material-icons'>build</i>} /></li>
           </ul>
         </div>
      );
  }
}

export default GoLConsole;
