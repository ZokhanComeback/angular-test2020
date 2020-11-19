import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

interface ISquare {
  color: string;
  selected: boolean;
  id: string;
  isBlue: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SquareService {
  public squares: ISquare[] = [];
  private colorsArr = [
    '#EE1C25',
    '#A52190',
    '#5D3198',
    '#F58726',
    '#F7A81B',
    '#FEF102',
    '#75C047',
  ];
  public checkingIsRunning = false;
  public checkMessage = '';
  public checkResult = '';
  constructor() { }
  public getRandomInt = (min: number, max: number, without?: number[]): number => {
    const result = Math.floor(min + Math.random() * (max + 1 - min));

    if (without && without.some(n => result === n)) {
      return this.getRandomInt(min, max, without);
    } else {
      return result;
    }
  }
  public getRandomColor = (): string => {
    return Math.floor(Math.random() * 16777215).toString(16);
  }
  public mixArray = (array) => {
    let j;
    let temp;
    const mixedArr = [...array];

    for (let i = mixedArr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));

      temp = mixedArr[j];
      mixedArr[j] = mixedArr[i];
      mixedArr[i] = temp;
    }

    return mixedArr;
  }
  public getRandomSquares = (): ISquare[] => {
    const int = this.getRandomInt(1, 3);
    const result: ISquare[] = [];

    for (let i = 0; i < int; i++) {
      result.push({
        color: '#0367B3',
        selected: false,
        id: uuidv4(),
        isBlue: true
      });
    }

    for (let i = 0; i < (6 - int); i++) {
      result.push({
        color: this.colorsArr[this.getRandomInt(0, this.colorsArr.length - 1)],
        selected: false,
        id: uuidv4(),
        isBlue: false
      });
    }
    return result;
  }
  public initSquares = () => {
    this.squares = [...this.mixArray(this.getRandomSquares())];
  }
  public selectShape = (id: string) => {
    const target = this.squares.find(s => s.id === id);
    target.selected = !target.selected;
  }
  public check = () => {
    if (
      this.checkingIsRunning
    ) {
      return;
    }
    this.checkingIsRunning = true;
    let checker = true;
    for (const s of this.squares) {
      if (
        s.isBlue &&
        !s.selected ||
        !s.isBlue &&
        s.selected
      ) {
        checker = false;
      }
    }
    if (
      checker
    ) {
      this.checkMessage = 'correct!';
      this.checkResult = 'squares__message_success';
      this.initSquares();
    } else {
      this.checkMessage = 'no way!';
      this.checkResult = 'squares__message_error';
    }
    setTimeout(() => {
      this.checkMessage = '';
      this.checkResult = '';
      this.checkingIsRunning = false;
      this.squares = this.squares.map(s => {
        return {
          ...s,
          selected: false
        };
      });
    }, 600);
  }
}
