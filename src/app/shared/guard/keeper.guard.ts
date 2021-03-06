import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators'
import { User } from '../services/user';

@Injectable({
  providedIn: 'root'
})
 
export class KeeperGuard implements CanActivate {
  
  constructor(
    private auth: AuthService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    
    return this.auth.user.pipe (
      take(1),
      map(data => data && data.roles.keeper && data.emailVerified? true : false),
      tap(isGuide => {
        if (!isGuide) {
          console.log('Guides Only');
          this.router.navigate(['./wrong-route']);
        }
      })
    );
  }
}