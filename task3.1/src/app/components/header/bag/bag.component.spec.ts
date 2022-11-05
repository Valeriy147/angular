import { NgxsModule } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagComponent } from './bag.component';

describe('BagComponent', () => {
  let component: BagComponent;
  let fixture: ComponentFixture<BagComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule.forRoot([]), NgxsModule.forRoot()],
      declarations: [BagComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 13 controls', () => {
    expect(component.form.contains('firstName')).toBeTruthy()
    expect(component.form.contains('lastName')).toBeTruthy()
    expect(component.form.contains('email')).toBeTruthy()
    expect(component.form.contains('number')).toBeTruthy()
    expect(component.form.contains('address')).toBeTruthy()
    expect(component.form.contains('town')).toBeTruthy()
    expect(component.form.contains('state')).toBeTruthy()
    expect(component.form.contains('zip')).toBeTruthy()
    expect(component.form.contains('billingMethod')).toBeTruthy()
    expect(component.form.contains('paymentMethod')).toBeTruthy()
    expect(component.form.contains('additional')).toBeTruthy()
    expect(component.form.contains('agreeToSending')).toBeTruthy()
    expect(component.form.contains('agreeWithPolicy')).toBeTruthy()
  })

  it('should mark field as invalid if empty value, expect for \'additional\' field, it is should mark as valid', () => {

    let firstName = component.form.get('firstName')
    let lastName = component.form.get('lastName')
    let email = component.form.get('email')
    let number = component.form.get('number')
    let address = component.form.get('address')
    let town = component.form.get('town')
    let state = component.form.get('state')
    let zip = component.form.get('zip')
    let billingMethod = component.form.get('billingMethod')
    let paymentMethod = component.form.get('paymentMethod')
    let additional = component.form.get('additional')
    let agreeToSending = component.form.get('agreeToSending')
    let agreeWithPolicy = component.form.get('agreeWithPolicy')

    firstName?.setValue('')
    lastName?.setValue('')
    email?.setValue('')
    number?.setValue('')
    address?.setValue('')
    town?.setValue('')
    state?.setValue('')
    zip?.setValue('')
    billingMethod?.setValue('')
    paymentMethod?.setValue('')
    additional?.setValue('')
    agreeToSending?.setValue('')
    agreeWithPolicy?.setValue('')

    expect(firstName?.valid).toBeFalsy()
    expect(lastName?.valid).toBeFalsy()
    expect(email?.valid).toBeFalsy()
    expect(number?.valid).toBeFalsy()
    expect(address?.valid).toBeFalsy()
    expect(town?.valid).toBeFalsy()
    expect(state?.valid).toBeFalsy()
    expect(zip?.valid).toBeFalsy()
    expect(billingMethod?.valid).toBeFalsy()
    expect(paymentMethod?.valid).toBeFalsy()
    expect(additional?.valid).toBeTruthy()
    expect(agreeToSending?.valid).toBeFalsy()
    expect(agreeWithPolicy?.valid).toBeFalsy()
  })


  it('should mark field as invalid if value length more then 30', () => {

    let firstName = component.form.get('firstName')
    let lastName = component.form.get('lastName')
    let town = component.form.get('town')
    let state = component.form.get('state')
    let email = component.form.get('email')

    firstName?.setValue('qwertyuiop asdfghjkl zxcvbnm qw')
    lastName?.setValue('qwertyuiop asdfghjkl zxcvbnm qw')
    town?.setValue('qwertyuiop asdfghjkl zxcvbnm qw')
    state?.setValue('qwertyuiop asdfghjkl zxcvbnm qw')

    expect(firstName?.valid).toBeFalsy()
    expect(lastName?.valid).toBeFalsy()
    expect(town?.valid).toBeFalsy()
    expect(state?.valid).toBeFalsy()
  })


  it('should mark field as invalid if value simple string', () => {
    let control = component.form.get('email')
    control?.setValue('Hello!')
    expect(control?.valid).toBeFalsy()
  })


  it('should mark number field as invalid if value less then 9', () => {
    let number = component.form.get('number')
    number?.setValue('86533292')
    expect(number?.valid).toBeFalsy()
  })

  it('should mark number field as invalid if value more than 13 symbols', () => {
    let number = component.form.get('number')
    number?.setValue('++380686533292')
    expect(number?.valid).toBeFalsy()
  })

  it('should mark number field as valid if value from 9 to 13 symbols', () => {
    let number = component.form.get('number')
    number?.setValue('0686533292')
    expect(number?.valid).toBeTruthy()
  })
});
