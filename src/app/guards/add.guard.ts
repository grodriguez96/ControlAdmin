import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProvidersService } from '../views/pie/services/providers.service';

@Injectable({
  providedIn: 'root'
})
export class AddGuard implements CanActivate {

  constructor(private provider: ProvidersService, private router: Router) { }

  canActivate() {

    this.router.navigate(['pie'])
    console.log(this.provider.addStatus)
    return this.provider.addStatus
  }

}
