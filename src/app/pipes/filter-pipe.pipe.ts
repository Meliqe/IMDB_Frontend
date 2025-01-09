import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterItems',
  standalone: true
})
export class FilterPipePipe implements PipeTransform {

  transform(items:any[], searchQuery: string,fieldName: string): any[]{
    if (!items || !searchQuery || !fieldName) {
      return items; // Eğer liste, arama sorgusu veya alan adı boşsa tüm listeyi döndür
    }
    return items.filter((item) =>
      item[fieldName]?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}
