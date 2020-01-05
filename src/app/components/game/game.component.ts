import { Component, OnInit } from '@angular/core';
import { Game, GameResult } from '../../models';

import {tap, filter, takeUntil} from 'rxjs/operators'
import {GameService} from '../../game.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  destroy$ = new Subject();

  size = 5;
  helpOn = false;
  result;
  game: Game;
  
  get group(){
    return this.game.group;
  }

  constructor(
    private gameService: GameService
  ) { }


  ngOnInit() {
    this.newGame();

    this
    .gameService
    .getMessage(GameResult)
    .pipe(
      tap(s=>{
      this.result = s;
      }),
      takeUntil(this.destroy$)
    )
    .subscribe();
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  newGame(){
    this.game = this.gameService.newGame(this.size);
    this.result = null;
  }

  help(){
    this.helpOn = !this.helpOn;
    this.gameService.help(this.helpOn);
  }
}
