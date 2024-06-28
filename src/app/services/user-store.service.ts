import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRolesFromStore(): Observable<string> {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getFullNameFromStore(): Observable<string> { // Asegúrate de retornar el Observable aquí
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullName: string) {
    this.fullName$.next(fullName);
  }
}
