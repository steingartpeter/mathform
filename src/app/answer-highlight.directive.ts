import { Directive, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, filter } from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]',
})
export class AnswerHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private cntrlName: NgControl) {}
  ngOnInit(): void {
    // console.log(this.elRef);
    // console.log(this.cntrlName.control?.parent?.value);
    this.cntrlName.control?.parent?.valueChanges
      .pipe(
        map(({ a, b, answer }) => {
          return Math.abs((a + b - answer) / (a + b));
        })
        //filter((value) => value <= 0.2)
      )
      .subscribe((val) => {
        console.log(val);
        if (val <= 0.2) {
          this.elRef.nativeElement.classList.add('close');
        } else {
          this.elRef.nativeElement.classList.remove('close');
        }
      });
  }
}
