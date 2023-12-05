import { Injectable } from '@angular/core';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class HandleTitleUpdate extends TitleStrategy {
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      document.title = `Conduit - ${title}`;
    } else {
      document.title = `Conduit - dashboard`;
    }
  }
}
