import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';
//bu yapıda ctor kullanamayız çünkü bu yapı class değil bir fonksiyondur
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService); // o yüzden bu şekilde enjecte etmeliyiz
  const protectedEndpoints = ['/userdetails','/addcomment','updateuser','usercomments','updatecomment','addorupdaterate','addfilmtolist','removefilmfromlist','userlist'];

  //eğer istek korunan endpoinete yapılmıyorsa direkt gönderiyoruz
  //bu korunan endpointe istek yapmıyorsak
  if(!protectedEndpoints.some(endpoint => req.url.includes(endpoint))){
    console.log(`Not a protected endpoint: ${req.url}`);
    return next(req);
  }
  //diğer isteklerde tokenı header kısmına ekliyoruz
  const token = authService.getToken();
  if (token) {
    console.log(`Adding token to request: ${token}`);
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(clonedRequest); // Güncellenmiş isteği gönder
  }
  return next(req); //korunan endpointe yapılan istekte token yoksa
};
