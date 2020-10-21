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

  local = 'http://localhost:4000/pie'
  online = 'https://powerful-journey-71632.herokuapp.com/pie'

  url = this.online

  getAllPie() { /** Get all data in pie columns */
    return this.http.get<Pie[]>(this.url)
  }

  postPie(data: Array<Pie>) { /** Create one or multiples pies */
    return this.http.post<Message>(this.url, data)
  }

  putPies(data: Array<Pie>) { /** Edit data of multiples pies */
    return this.http.put<Message>(this.url, data)
  }

  putPie(data: Pie, id: number) { /*** Edit data of one pie */
    return this.http.put<Message>(`${this.url}/${id}`, data)
  }

  getPie(id: number) { /** Get data of one pie. IMPORTANT: NOT IMPLEMENTED YET !*/
    return this.http.get(`${this.url}/${id}`)
  }

  deletePie(id: number) { /**Delete data of one pies */
    return this.http.delete<Message>(`${this.url}/${id}`)
  }

  deletePies(data: Pie[]) {
    return this.http.put<Message>('https://powerful-journey-71632.herokuapp.com/deletepies', data)
  }
}
