// 电话号码校验器
import {FormControl, FormGroup} from '@angular/forms';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {isNull} from 'util';

// function 用于声明为函数
// export 用于从文件（或模块）中导出函数，使得可以在另一个文件中通过 import 语句导入
export function mobileValidator(control: FormControl): any {
  // myreg 11位手机号正则，13n、15n、18n开头，后边+8位数字
  const myreg = /^(((13[0-9])|(15[0-9])|(18[0-9]))+\d{8})$/;
  const valid = myreg.test(control.value);
  console.log('电话号码的校验结果是：' + valid);
  return valid ? null : {phoneNumber: true};
}

// 异步校验器
export function mobileAsyncValidator(control: FormControl): any {
  // myreg 11位手机号正则，13n、15n、18n开头，后边+8位数字
  const myreg = /^(((13[0-9])|(15[0-9])|(18[0-9]))+\d{8})$/;
  const valid = myreg.test(control.value);
  console.log('电话号码的异步校验结果是：' + valid);
  // delay 是为了模拟调服务器，服务器处理了一段时间才返回
  return of(valid ? null : {phoneNumber: true}).pipe(delay(3000));
}

export function equalValidator(group: FormGroup): any {
  // as 用来限制 password的类型
  const password: FormControl = group.get('password') as FormControl;
  const pconfirm: FormControl = group.get('pconfirm') as FormControl;
  const valid: boolean = (password.value === pconfirm.value);
  console.log('两次密码输入一致：' + valid);
  return valid ? null : {equal: {descInfo: '两次输入的密码不一致'}};
}

export function equalValidatorT(group: FormGroup): any {
  // as 用来限制 password的类型
  const password: FormControl = group.get('password') as FormControl;
  const pconfirm: FormControl = group.get('pconfirm') as FormControl;

  let valid = true;
  if ((password != null) && (pconfirm != null)) {
    valid = (password.value === pconfirm.value);
  }
  // const valid: boolean = (password.value === pconfirm.value);
  console.log('两次密码输入一致：' + valid);
  return valid ? null : {equal: true};
}
