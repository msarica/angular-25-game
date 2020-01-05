
import {GameService} from './game.service';

export class Game {
  private currentCount = 1;
  private total;

  blocks = [];
  group = [];

  lastSelected: Block;

  constructor(
    private gameService: GameService,
    private size = 5
  ){
    if(!size || size<5){
      this.size = 5;
    }

    this.total = this.size * this.size;

    this.generateBlocks();
  }

  private generateBlocks(){
    let counter = 0;

    for(let x=0; x< this.size; x++){
      const row = [];
      for(let y=0; y< this.size; y++){
        counter+=1;
        const b = new Block(x, y, this);
        this.blocks.push(b);
        row.push(b);
      }
      this.group.push(row);
    }
  }
  
  private calculate(){
    this.blocks.forEach(b=> b.calculate());
    if(!this.blocks.some(i=>i.canSelect)){
      const message = this.currentCount === this.total? 'You win': `Your Score (${this.currentCount}/${this.total})`;
      this.gameService.gameResult(message);
    }
  }

  public getNextNumber(b: Block){
    this.lastSelected = b;
    const cur = this.currentCount;

    this.calculate();

    this.currentCount +=1;
    return cur;
  }
}

export class Block {
  public value: number
  public canSelect: boolean = true;
  public active = false;

  constructor(
    private x: number,
    private y: number,
    private game: Game,
  ){}

  select(){
    this.value = this.game.getNextNumber(this);
    this.active = true;
    return this.value;
  }

  calculate(){
    this.active = false;
    this.canSelect = this.checkIfSelect();
  }

  private checkIfSelect(): boolean {
    if(this.value){
      return false;
    }

    const last = this.game.lastSelected;
    if(!last){
      return true;
    }
    if(last.x === this.x && Math.abs(this.y - last.y) === 3){
      return true;
    } else if(last.y === this.y && Math.abs(this.x - last.x) == 3) {
      return true;
    } else if(Math.abs(last.x - this.x) === 2 && Math.abs(last.y - this.y)===2){
      return true;
    }

    return false;
  }
}

// ------
export interface Action {
  payload?: any
}
export class GameResult implements Action {
  constructor(
    public payload: string
  ){}
};
export class Help implements Action{
  constructor(
    public payload: boolean
  ){}
}