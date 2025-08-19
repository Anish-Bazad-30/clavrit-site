import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeContent'
})
export class DecodeContentPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '';

    let fixed = value;
    console.log(fixed);
    
    try {
      // Try to repair double-encoded UTF-8 (Ã issues)
      fixed = decodeURIComponent(escape(fixed));
      console.log(fixed);
    } catch {
      // ignore decode errors
    }

    // Clean up leftover junk characters
    fixed = fixed
      .replace(/Ã¢/g, "'")
      .replace(/ÃÂ/g, " ")
      .replace(/Â/g, "")
      .replace(/Ã/g, "");

    return fixed;
  }

}
