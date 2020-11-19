import {Component, Input, OnInit} from '@angular/core';
import {SquareService} from '../../services/square.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  @Input() color: string;
  @Input() selected: boolean;
  @Input() id: string;

  constructor(public squareService: SquareService) {}

  ngOnInit(): void {
  }

}
