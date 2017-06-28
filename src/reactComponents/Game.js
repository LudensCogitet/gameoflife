import React, {Component} from 'react';
import GoLConsole from './GoLConsole';
import Row from './Row';

class Location{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

class Game extends Component{
  constructor(props){
    super(props);

    this.boardMaxSize = 200;
    this.cellBorder = '1px solid black';
    this.cellColor = 'red';
    this.cellSizes = {'large': 12,
                      'small': 6};
    this.gameSpeeds = {'fast': 1000/15,
                       'slow': 1000/5};

    this.mouseDown = false;
    this.state = {running: true,
                  cellSize: this.cellSizes['large'],
                  cellBorders: this.cellBorder,
                  cellColor: this.cellColor,
                  generations: 0};


    this.generateCells = this.generateCells.bind(this);
    this.checkCell = this.checkCell.bind(this);
    this.tick = this.tick.bind(this);

    this.run = this.run.bind(this);
    this.clear = this.clear.bind(this);
    this.randomFill = this.randomFill.bind(this);

    this.consoleCommand = this.consoleCommand.bind(this);

    this.timer = 0;
    this.speed = this.gameSpeeds['fast'];

    this.cells = [];

    this.generateCells(props.width,props.height);
    this.randomFill();
  }

  componentDidMount(){
    setTimeout(()=>{this.timer = setInterval(this.tick,this.speed);},1500);
  }

  generateCells(width, height){
    this.cells = [];

    for(let y = 0; y < height; y++){
      this.cells.push([]);
      for(let x = 0; x < width; x++){
        var newXPlus = (x+1) < width ? (x+1) : 0;
        var newXMinus = (x-1) >= 0 ? (x-1) : width-1;
        var newYPlus = (y+1) < height ? (y+1) : 0;
        var newYMinus = (y-1) >= 0 ? (y-1) : height-1;

        this.cells[this.cells.length-1].push({'alive': false,
                                              'neighbors': [new Location(newXMinus,newYMinus),
                                                            new Location(x,newYMinus),
                                                            new Location(newXPlus,newYMinus),
                                                            new Location(newXMinus,y),
                                                            new Location(newXPlus,y),
                                                            new Location(newXMinus,newYPlus),
                                                            new Location(x,newYPlus),
                                                            new Location(newXPlus,newYPlus)]
                                             });
      }
    }
  }

  run(){
    if(this.state.running == false){
      this.setState({running: true});
      this.timer = setInterval(this.tick,this.speed);
    }
    else{
      this.setState({running: false});
      clearInterval(this.timer);
    }
  }

  randomFill(){
    for(let y = 0; y < this.cells.length; y++){
      for(let x = 0; x < this.cells[y].length; x++){
        this.cells[y][x].alive = Math.random() <= 0.5 ? true : false;
      }
    }
    this.setState({generations: 0});
  }

  clear(){
    for(let y = 0; y < this.cells.length; y++){
      for(let x = 0; x < this.cells[y].length; x++){
        this.cells[y][x].alive = false;
      }
    }
    this.setState({generations: 0});
  }

  consoleCommand(changes){
    var newState = {};
    if('gameSpeed' in changes){
      this.speed = this.gameSpeeds[changes.gameSpeed];
      if(this.state.running){
        clearInterval(this.timer);
        this.timer = setInterval(this.tick,this.speed);
      }
    }

    if('cellSize' in changes){
      newState['cellSize'] = this.cellSizes[changes.cellSize];
    }

    if('cellBorders' in changes){
      newState['cellBorders'] = changes.cellBorders == true ? this.cellBorder : 'none';
    }

    if('boardSize' in changes){
      var newWidth = parseInt(changes.boardSize.width);
      var newHeight = parseInt(changes.boardSize.height);
      if(newWidth > 0 && newWidth <= this.boardMaxSize && newHeight > 0 && newHeight <= this.boardMaxSize){
        this.generateCells(newWidth,newHeight);
        newState['running'] = false;
        newState['generations'] = 0;
        clearInterval(this.timer);
      }
      else{
        alert("Board width and height must be numbers from 1 to "+this.boardMaxSize+" (inclusive)");
      }
    }

    this.setState(newState);
  }

  tick(){
    var newCells = [];
    for(let y = 0; y < this.cells.length; y++){
      newCells.push([]);
      for(let x = 0; x < this.cells[y].length; x++){
        var liveNeighbors = 0;

        var neighbors = this.cells[y][x].neighbors;
        for(let i = 0; i < neighbors.length; i++){
          if(neighbors[i].x > -1 &&
             neighbors[i].y > -1 &&
             neighbors[i].x < this.cells[y].length &&
             neighbors[i].y < this.cells.length){
             liveNeighbors += this.cells[neighbors[i].y][neighbors[i].x].alive == true ? 1 : 0;
          }
        }

        var living = false;
        if(this.cells[y][x].alive){
          if(liveNeighbors < 2 || liveNeighbors > 3){
            living = false;
          }
          else{
            living = true;
          }
        }
        else{
          if(liveNeighbors == 3){
            living = true;
          }
        }

        newCells[y].push({'alive': living,
                          'neighbors': this.cells[y][x].neighbors});
      }
    }

    this.cells = newCells;
    this.setState({generations: ++this.state.generations});
  }

  checkCell(pos,didClick = false){
    if(this.mouseDown || didClick){
      this.cells[pos[1]][pos[0]].alive = this.cells[pos[1]][pos[0]].alive == true ? false : true;
      this.setState({generations: 0});
    }
  }

  render(){
    return (
      <div>
        <GoLConsole running={this.state.running}
          run={this.run}
          clear={this.clear}
          tick={this.tick}
          randomFill={this.randomFill}
          generations={this.state.generations}
          consoleCommand={this.consoleCommand}/>
        <div style={{fontSize: 0, whiteSpace: 'nowrap'}}
           onMouseUp={(e)=>{this.mouseDown = false;}}
           onMouseDown={(e)=>{this.mouseDown = true;}}
           onMouseLeave={(e)=>{this.mouseDown = false;}}>
            {this.cells.map((e,i)=>{return (<Row key={i}
                                                 squares={e}
                                                 cellSize={this.state.cellSize}
                                                 cellBorder={this.state.cellBorders}
                                                 y={i}
                                                 checkCell={this.checkCell}/>);})}
        </div>
     </div>
    );
  }
}

export default Game;
