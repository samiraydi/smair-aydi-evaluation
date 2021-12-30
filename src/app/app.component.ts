import { Component, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { animate } from '@angular/animations';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selected:any;
  myForm: FormGroup;
  @ViewChild('chipList', { static: true }) chipList;
  countries: any = ['Tunis', 'Sfax', 'Sousse', 'Kef', 'Nabeul'];
  SubjectsArray: Subject[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.reactiveForm()
    console.log(this.myForm.controls.name.errors)
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      gender: ['Male'],
      dob: ['', [Validators.required]],
      country: ['',[Validators.required]],
    })
  }

  /* Date */
    date(e) {
      var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
      this.myForm.get('dob').setValue(convertDate, {
        onlyself: true
      })
    }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim() && this.SubjectsArray.length < 5) {
      this.SubjectsArray.push({ name: value.trim() })
    }
    if (input) {
      input.value = '';
    }
  }

  remove(subject: Subject): void {
    const index = this.SubjectsArray.indexOf(subject);
    if (index >= 0) {
      this.SubjectsArray.splice(index, 1);
    }
  }  

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  submitForm() {
    if(this.myForm.invalid){
      alert("You need to fill required form data")
      return 
    }
    alert("Form submited")
    this.myForm.reset();
  }

  restForm(){
    this.myForm.reset();
  }

}
