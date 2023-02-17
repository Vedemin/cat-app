import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyExchange'
})
export class CurrencyExchangePipe implements PipeTransform {

  transform(value: number, args: unknown[], selectedCurrency: string): number {
    if (selectedCurrency == "EUR")
      return value;
    else {
      switch (selectedCurrency) {
        case "USD":
          return value * 1.09;
          break;
        case "PLN":
          return value * 4.71;
          break;
        default:
          return value;
          break;
      }
    }
  }

}
