import { Injectable } from '@angular/core';
import { Pie } from '../../../interfaces/pie/pie'

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  private _editData: { id?: number; variety?: string; price?: number; }[];
  private _editStatus: boolean = false;
  private _addStatus: boolean = false;

  public get editStatus(): boolean {
    return this._editStatus;
  }
  public set editStatus(value: boolean) {
    this._editStatus = value;
  }
  public get addStatus(): boolean {
    return this._addStatus;
  }
  public set addStatus(value: boolean) {
    this._addStatus = value;
  }
  public get editData(): Array<Pie> {
    return this._editData;
  }
  public set editData(value: Array<Pie>) {
    this._editData = value;
  }




}
