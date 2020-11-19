import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router,  private message: NzMessageService, private route: ActivatedRoute) { }
  
  canActivate(route:ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        if(this.userService.isAdmin) {
            return true;
        }else {
            this.message.error('Access Denied. Can not Access this page');
             this.router.navigate(['../'],{ relativeTo: this.route});
             return false;
        }
}
}
