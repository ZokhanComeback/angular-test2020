import {Component, OnInit} from '@angular/core';
import {SquareService} from './services/square.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public squareService: SquareService) {}
  title = 'app';
  ngOnInit(): void {
    this.squareService.initSquares();
  }
}
