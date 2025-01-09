import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFilms',
  standalone: true
})
export class FilterPipePipe implements PipeTransform {

  transform(items:any[], searchQuery: string): any[]{
    if (!items || !searchQuery) {
      return items; // Eğer dizi veya arama sorgusu boşsa tüm listeyi döndür
    }
    return items.filter((item) =>
      item.filmName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}
