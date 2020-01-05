import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BlockComponent } from './components/block/block.component';
import { GameComponent } from './components/game/game.component';
import { GameService } from './game.service';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, BlockComponent, GameComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
