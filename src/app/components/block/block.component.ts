import { Component, OnInit,Input
 } from '@angular/core';
import {Block, Help} from '../../models'
import {GameService} from '../../game.service';
import {Subject} from 'rxjs';
import {filter, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  destroy$ = new Subject();
  helpOn = false;

  get selected(){
    return !!this.block.value;
  }

  get value(){
    return this.block.value;
  }

  get canSelect(){
    return this.block.canSelect;
  }

  @Input()
  block: Block;

  constructor(
    private gameService: GameService,
  ) { }

  ngOnInit() {

    this.gameService
    .getMessage(Help)
    .pipe(
      tap(i=> this.helpOn = i as boolean),
      takeUntil(this.destroy$)
    ).subscribe();

  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  getClass(){
    return {
      'active': this.block.active,
      'block2' : true, 
      'selected': this.selected,
      'canSelect': this.canSelect,
      'help': this.helpOn && this.canSelect
      };
  }


  onSelect(){
    if(!this.selected && this.canSelect){
      this.block.select();
    }
  }
}