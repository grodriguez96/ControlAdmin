import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProvidersService } from '../views/pie/services/providers.service';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {

  constructor(private provider: ProvidersService, private router: Router) { }

  canActivate() {
    this.router.navigate(['pie'])
    console.log(this.provider.editStatus)
    console.log(`route ${this.router.url}`); // the url you are going to
    console.log(`state ${this.router.url}`); // the url you are going to
    console.log(`router ${this.router.url}`); // the url you are coming from
    return this.provider.editStatus
  }

}
