import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MathValidators } from "../math-validators";

import { delay, filter, scan } from "rxjs/operators";

@Component({
  selector: "app-equation",
  templateUrl: "./equation.component.html",
  styleUrls: ["./equation.component.css"],
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(""),
    },
    [MathValidators.addition("answer", "a", "b")]
  );

  constructor() {}

  // Implementing getters
  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  ngOnInit(): void {
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === "VALID"),
        delay(500),
        scan(
          (acc, value) => {
            return {
              numberSolved: acc.numberSolved + 1,
              startTime: acc.startTime,
            };
          },
          { numberSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(({ numberSolved, startTime }) => {
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;

        // To set new random number
        // this.mathForm.controls.a.setValue(this.randomNumber());
        // this.mathForm.controls.b.setValue(this.randomNumber());
        // this.mathForm.controls.answer.setValue("");

        // or
        // Set value to update all fields
        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: "",
        });
        // Patch value to update only some fields
        // this.mathForm.patchValue({
        //   b: this.randomNumber(),
        //   answer: "",
        // });
      });
  }

  // generate random number
  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
