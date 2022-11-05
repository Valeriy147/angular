import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})

export class PhonePipe implements PipeTransform {

  transform(phone: string): string {
    let number = ''
    for (let i = 0; i < phone.length; i++) {
      if ('0123456789'.includes(phone[i])) {
        number = number + (phone[i]).toString()
      }
    }

    switch (number.length) {
      case 9:
        number = `+380 (${number.slice(0, 2)}) ${number.slice(2, 5)}-${number.slice(5, 7)}-${number.slice(7, 9)}`
        break;
      case 10:
        number = `+38${number[0]}  (${number.slice(1, 3)}) ${number.slice(3, 6)}-${number.slice(6, 8)}-${number.slice(8, 10)}`
        break;
      case 11:
        number = `+3${number.slice(0, 2)}  (${number.slice(2, 4)}) ${number.slice(4, 7)}-${number.slice(7, 9)}-${number.slice(9, 11)}`
        break;
      case 12:
        number = `+${number.slice(0, 3)}  (${number.slice(3, 5)}) ${number.slice(5, 8)}-${number.slice(8, 10)}-${number.slice(10, 12)}`
        break;
      default:
        console.warn('У номері телефону неправильна кількість цифр')
        break;
    }
    return number;
  }

}
