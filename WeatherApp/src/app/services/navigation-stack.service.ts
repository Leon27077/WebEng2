import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationStackService{
  private readonly storage_key:string = "navigationStack";



  constructor() {
    const existingStack = sessionStorage.getItem(this.storage_key);

    if (!existingStack) {
      this.setStack([]);
    }
  }

  private setStack(value:any){
    sessionStorage.setItem(this.storage_key, JSON.stringify(value))
  }

  private getStack(){
    return JSON.parse(<string>sessionStorage.getItem(this.storage_key))
  }

  public push(value: string[]) {
    let stack = this.getStack();
    let val = JSON.stringify(value);
    stack.unshift(val);
    this.setStack(stack);
  }

  public pop(){
    let stack = this.getStack();
    stack.shift();
    this.setStack(stack);
  }

  public peek(){
    let stack = this.getStack();
    return JSON.parse(stack[0]);
  }


}
