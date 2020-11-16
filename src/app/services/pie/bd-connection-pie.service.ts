import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pie } from '../../interfaces/pie/pie'

@Injectable({
  providedIn: 'root'
})
export class BdConnectionPieService {

  constructor(private http: HttpClient) {
  }

  local = 'http://localhost:4000'
  online = 'https://powerful-journey-71632.herokuapp.com'

  url = this.online

  /** Get all data in pie columns */
  getAllPie() {
    return this.http.get<Pie[]>(`${this.url}/pie`)
  }

  /** Create one or multiples pies */
  postPie(data: Array<Pie>) {
    return this.http.post(`${this.url}/pie`, data)
  }

  /** Edit data of multiples pies */
  putPies(data: Array<Pie>) {
    return this.http.put(`${this.url}/pie`, data)
  }

  /** Edit data of one pie */
  putPie(data: Pie, id: number) {
    return this.http.put(`${this.url}/pie/${id}`, data)
  }

  /** Get data of one pie */
  getPie(id: number) {
    return this.http.get(`${this.url}/${id}`)
  }

  /**Delete data of one pies */
  deletePie(id: number) {
    return this.http.delete(`${this.url}/pie/${id}`)
  }

  /**Delete data of multiples pies */
  deletePies(data: Pie[]) {
    return this.http.put(`${this.url}/deletepies`, data)
  }
}
