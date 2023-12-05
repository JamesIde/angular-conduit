import { Injectable } from '@angular/core';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class SetConduitTitle extends TitleStrategy {
  override updateTitle(routerState: RouterStateSnapshot) {
    console.log(routerState);
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      document.title = `Conduit - ${title}`;
    } else {
      document.title = `Conduit - dashboard`;
    }
  }
}
