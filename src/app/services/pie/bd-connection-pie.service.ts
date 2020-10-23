import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pie } from '../../interfaces/pie/pie'
import { Message } from '../../interfaces/dialog/message'


@Injectable({
  providedIn: 'root'
})
export class BdConnectionPieService {

  constructor(private http: HttpClient) {
  }

  local = 'http://localhost:4000'
  online = 'https://powerful-journey-71632.herokuapp.com'

  url = this.online

  getAllPie() { /** Get all data in pie columns */
    return this.http.get<Pie[]>(`${this.url}/pie`)
  }

  postPie(data: Array<Pie>) { /** Create one or multiples pies */
    return this.http.post<Message>(`${this.url}/pie`, data)
  }

  putPies(data: Array<Pie>) { /** Edit data of multiples pies */
    return this.http.put<Message>(`${this.url}/pie`, data)
  }

  putPie(data: Pie, id: number) { /*** Edit data of one pie */
    return this.http.put<Message>(`${this.url}/pie/${id}`, data)
  }

  getPie(id: number) { /** Get data of one pie. IMPORTANT: NOT IMPLEMENTED YET !*/
    return this.http.get(`${this.url}/${id}`)
  }

  deletePie(id: number) { /**Delete data of one pies */
    return this.http.delete<Message>(`${this.url}/pie/${id}`)
  }

  deletePies(data: Pie[]) {
    return this.http.put<Message>(`${this.url}/deletepies`, data)
  }
}
