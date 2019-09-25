import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {equalValidator, mobileAsyncValidator, mobileValidator} from '../validator/Validators';

@Component({
  selector: 'app-reactive-regist',
  templateUrl: './reactive-regist.component.html',
  styleUrls: ['./reactive-regist.component.css']
})
export class ReactiveRegistComponent implements OnInit {

  formModel: FormGroup;

  constructor(fb: FormBuilder) {
    this.formModel = fb.group({
      // username, 这里在FormBuilder下，用一个数组实例化一个FormControl，
      // 数组的各元素含义[FormControl初始值，一个校验方法，一个异步的校验方法]
      // 若元素多于三个，其它的元素就会被忽略
      username: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', mobileValidator, mobileAsyncValidator],
      passwordsGroup: fb.group({
        password: ['', Validators.minLength(6)],
        pconfirm: [''],
      }, {validators: equalValidator})
    });
  }

  onSubmit() {
    // 整个formModel中所有验证都合法，才会打印值信息
    const errors = this.formModel.get('username').errors;
    console.log('username的校验结果：' + JSON.stringify(errors));
    if (this.formModel.valid) {
      console.log(this.formModel.value);
    }
  }

  ngOnInit() {
  }
}
