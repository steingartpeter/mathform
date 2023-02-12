import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter } from 'rxjs/operators';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  mathForm = new FormGroup(
    {
      a: new FormControl(this.rndNumber()),
      b: new FormControl(this.rndNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );

  constructor() {}

  get a() {
    return this.mathForm.value.a;
  }
  get b() {
    return this.mathForm.value.b;
  }

  ngOnInit(): void {
    // console.log(`this.mathForm.statusChanges:`);
    // console.log(this.mathForm.statusChanges);
    this.mathForm.statusChanges
      .pipe(
        filter((value: string) => value === 'VALID'),
        delay(200)
      )
      .subscribe((value) => {
        this.mathForm.setValue({
          a: this.rndNumber(),
          b: this.rndNumber(),
          answer: '',
        });
        //<nn>
        // If we aent to update only some of the values but not all:
        // use this.mathForm.patchValue({...})
        //</nn>
      });
  }

  rndNumber() {
    return Math.floor(Math.random() * 20);
  }
}
