import { NgxsModule } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule.forRoot([]), NgxsModule.forRoot()],
      declarations: [CommentsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 4 controls', () => {
    expect(component.form.contains('email')).toBeTruthy()
    expect(component.form.contains('name')).toBeTruthy()
    expect(component.form.contains('text')).toBeTruthy()
    expect(component.form.contains('score')).toBeTruthy()
  })

  it('should mark email as invalid if empty value', () => {
    let control = component.form.get('email')
    control?.setValue('')
    expect(control?.valid).toBeFalsy()
  })

  it('should mark email as invalid if value simple string', () => {
    let control = component.form.get('email')
    control?.setValue('Hello!')
    expect(control?.valid).toBeFalsy()
  })

  it('should mark name as invalid if empty value', () => {
    let control = component.form.get('name')
    control?.setValue('')
    expect(control?.valid).toBeFalsy()
  })

  it('should mark name as invalid if value length more then 30', () => {
    let control = component.form.get('name')
    control?.setValue('qwertyuiop asdfghjkl zxcvbnm qw')
    expect(control?.valid).toBeFalsy()
  })

  it('should mark score as invalid if empty value', () => {
    let control = component.form.get('score')
    control?.setValue('')
    expect(control?.valid).toBeFalsy()
  })


  it('should mark text as valid if empty value', () => {
    let control = component.form.get('text')
    control?.setValue('')
    expect(control?.valid).toBeTruthy()
  })
});
