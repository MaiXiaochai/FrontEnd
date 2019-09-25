import { Directive } from '@angular/core';
import {NG_VALIDATORS} from '@angular/forms';
import {equalValidatorT} from '../validator/Validators';

@Directive({
  selector: '[appEqualValidator]',
  // multi: true 表示 同个token下可以挂多个值
  // 这里appMobileValidator和appEqualValidator都用了NG_VALIDATORS
  providers: [{provide: NG_VALIDATORS, useValue: equalValidatorT, multi: true}]
})
export class EqualValidatorDirective {

  constructor() { }

}
