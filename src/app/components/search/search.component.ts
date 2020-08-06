import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  registerForm: FormGroup;
  allUsers: any[];
  autoCompleteList: any[];

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() SelectedOptionOn = new EventEmitter();

  constructor(public dataservice: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      search: [''],
    });

    this.allUsers = this.dataservice.AllUsers;

    this.registerForm.valueChanges.subscribe(data => {
      if (data.search === '') {
        this.autoCompleteList = [];
      } else {
        const categoryList = this.filterCategoryList(data.search);
        this.autoCompleteList = categoryList;
      }
    });

  }


  Reset() {
    this.SelectedOptionOn.emit(this.allUsers);
    this.registerForm.reset();
    this.autoCompleteList = [];
  }

  filterCategoryList(val) {
    const categoryList = [];
    if (typeof val !== 'string') {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allUsers.filter(s => s.login.toLowerCase().indexOf(val.toLowerCase()) !== -1)
      : this.allUsers;
  }

  selectUser(event) {
    const user = event.source.value;
    this.SelectedOptionOn.emit(user);
    this.focusOnPlaceInput();
    this.registerForm.reset();
    this.autoCompleteList = [];
  }

  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }


}
