import { Directive, ElementRef, forwardRef, HostListener, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecimalHelper } from '../../utils/decimal-number.helper';
import { LodashHelper } from '../../utils/lodash.helper';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[decimalInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DecimalNumberDirective),
      multi: true,
    },
  ],
})
export class DecimalNumberDirective implements ControlValueAccessor {
  private el: HTMLInputElement | any;
  private innerValue: number | any = 0;
  private propagateChange = (_: any) => {};
  private propagateBlur = () => {};

  constructor(private elementRef: ElementRef, private decimalHelper: DecimalHelper) {
    this.el = this.elementRef.nativeElement;
  }

  private onValueChange(): boolean {
    if (this.el.value) {
      const data = LodashHelper.toNumber(this.el.value.replace(new RegExp(',', 'g'), ''));
      if ((data || data === 0) && this.innerValue !== data) {
        this.innerValue = data;
        this.propagateChange(this.innerValue);
        return true;
      } else {
        return false;
      }
    } else {
      this.innerValue = undefined;
      this.propagateChange(this.innerValue);
      return true;
    }
  }

  // tslint:disable-next-line: member-ordering
  @HostBinding('type') elType = 'tel';

  // tslint:disable-next-line: member-ordering
  @HostBinding('disabled') disabled: any;

  @HostBinding('value') get setValue() {
    const valueToNumber = LodashHelper.isNil(this.innerValue)
      ? null
      : LodashHelper.toNumber(this.innerValue);
    return this.decimalHelper.format(LodashHelper.isNil(valueToNumber) ? '' : valueToNumber);
    // new DecimalPipe('en-US').transform(valueToNumber || this.innerValue === 0 ? valueToNumber : null, FORMAT_NUMBER);
  }

  @HostListener('keyup', ['$event'])
  onKeyPressInput(event: KeyboardEvent) {
    this.onValueChange();
  }

  @HostListener('keydown', ['$event'])
  onKeyDownInput(event: KeyboardEvent | any) {
    if (
      !event.shiftKey &&
      (event.ctrlKey ||
        // tslint:disable-next-line: max-line-length
        ((<HTMLInputElement>event.target).selectionStart === 0 &&
          (event.keyCode === 189 || event.keyCode === 109) &&
          (this.innerValue > 0 || LodashHelper.isEmpty(this.innerValue))) ||
        (this.el.value.indexOf('.') < 0 && (event.keyCode === 190 || event.keyCode === 110)) ||
        this.checkKeyNumber(event.keyCode))
    ) {
      return;
    }
    event.preventDefault();
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any) {
    this.onValueChange();
    this.propagateBlur();
    const eventChange = document.createEvent('Event');
    eventChange.initEvent('change', true, true);
    this.el.dispatchEvent(eventChange);
  }

  private checkKeyNumber(keyCode: number | any): boolean {
    // tslint:disable-next-line: max-line-length
    // const keysNumber = [].concat(LodashHelper.range(16, 21), LodashHelper.range(33, 58), LodashHelper.range(96, 106), LodashHelper.range(112, 146), [8, 9, 13, 27, 91, 92, 93]);
    // return keysNumber.includes(keyCode);
    return keyCode;
  }

  public writeValue(value: any) {
    this.innerValue =
      value === '' || LodashHelper.isNil(LodashHelper.toNumber(value)) ? null : value;
    this.el.value = this.setValue;
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // not used, used for touch input
  public registerOnTouched(fn: any) {
    this.propagateBlur = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
