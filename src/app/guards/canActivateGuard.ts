import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any;
}
