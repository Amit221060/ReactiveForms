import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  validationMesseges = {
    firstName: {
      'required': "First Name can not be Empty",
      'minlength': "Minimum 3 characters are required",
      'maxlength': "Maximum 12 characters are allowed"
    },
    middleName: {
      'minlength': "Minimum 3 characters are required",
      'maxlength': "Maximum 12 characters are allowed"
    },
    lastName: {
      'minlength': "Minimum 3 characters  are required",
      'maxlength': "Maximum 12 characters are allowed"
    },
    email: {
      'required': "Email is required",
    },
    mobile: {
      'required': "Mobile number  is required",
    },
    permanent: {
      'required': "Permanent address field is required",
    },
    address2: {},
    city: {
      'required': "city field is required",
    },
    state: {
      'required': "State field is required",
    },
    zip: {
      'required': "Zip field is required",
    },
    board: {
      'required': "This field is required",
    }
  }
  errorOccured = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    mobile: '',
    permanent: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    board: ''
  }
  constructor(private fb: FormBuilder) { }
  title = 'ReactiveForm';
  formData: FormGroup;
  ngOnInit() {
    this.formData = this.fb.group({
      Name: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
        middleName: ['', [Validators.minLength(3), Validators.maxLength(12)]],
        lastName: ['', [Validators.minLength(3), Validators.maxLength(12)]]
      }),
      Email: this.fb.group({
        email: ['', Validators.required],
        mobile: ['', Validators.required]
      }),
      Address: this.fb.group({
        permanent: ['', Validators.required],
        address2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      Board: this.fb.group({
        board: ['', Validators.required]
      })
    });

    this.formData.valueChanges
      .subscribe(data => {
        this.formkeys(this.formData);
      });
  }
  formkeys(group: FormGroup = this.formData) {
    Object.keys(group.controls).forEach(key => {
      const abstractcontrol = group.get(key);
      if (abstractcontrol instanceof FormGroup) {
        this.formkeys(abstractcontrol);
      }
      else {
        this.errorOccured[key] = '';
        if (abstractcontrol && !abstractcontrol.valid && (abstractcontrol.dirty || abstractcontrol.touched)) {
          let erroremessage = this.validationMesseges[key];
          for (const errorekey in abstractcontrol.errors) {
            if (errorekey) {
              this.errorOccured[key] += erroremessage[errorekey] + '';
            }
          }
        }
      }
    });
  }

  onSubmit() {
    console.log(this.formData.value);
  }
}
