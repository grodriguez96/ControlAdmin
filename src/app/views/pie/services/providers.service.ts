import { Injectable } from '@angular/core';
import { Pie } from '../../../interfaces/pie/pie'

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  private _editData: { id?: number; variety?: string; price?: number; }[];

  public get editData(): Array<Pie> {
    return this._editData;
  }
  public set editData(value: Array<Pie>) {
    this._editData = value;
  }




}
