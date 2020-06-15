import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-equation",
  templateUrl: "./equation.component.html",
  styleUrls: ["./equation.component.css"],
})
export class EquationComponent implements OnInit {
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(""),
    },
    [
      (form: AbstractControl) => {
        // destructured syntax
        const { a, b, answer } = form.value;

        if (a + b === parseInt(answer)) {
          // sends null cause there is no errors
          return null;
        } else {
          // sends addition true to form errors
          return { addition: true };
        }
      },
    ]
  );

  constructor() {}

  // Implementing getters
  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  ngOnInit(): void {}

  // generate random number
  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
