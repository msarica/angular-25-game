import { Injectable } from '@angular/core';
import {Game, Help, GameResult, Action} from './models';
import {Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _statusChanges = new Subject<Action>();
  statusChanges$ = this._statusChanges.asObservable();

  constructor() { }

  getMessage(action: any){
    return this.statusChanges$
      .pipe(
        filter(i=> i instanceof action),
        map(i=> i.payload)
      );
  }
  
  newGame(size: number){
    return new Game(this, size);
  }

  help(help: boolean){
    this._statusChanges.next(new Help(help));
  }

  gameResult(message: string){
    this._statusChanges.next(new GameResult(message));
  }
}