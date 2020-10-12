import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pie } from '../../interfaces/pie/pie'


@Injectable({
  providedIn: 'root'
})
export class BdConnectionPieService {

  constructor(private http: HttpClient) {
  }

  url = 'https://powerful-journey-71632.herokuapp.com/pie'
  httpParams = new HttpParams()

  getAllPie() { /** Get all data in pie columns */
    return this.http.get<Pie[]>(this.url)
  }

  postPie(data: Array<number>) { /** Create one or multiples pies */
    return this.http.post(this.url, data)
  }

  putPies(data: Array<Pie>) { /** Edit data of multiples pies */
    return this.http.put(this.url, data)
  }

  putPie(data: Pie, id: number) { /*** Edit data of one pie */
    return this.http.put(`${this.url}/${id}`, data)
  }

  getPie(id: number) { /** Get data of one pie. IMPORTANT: NOT IMPLEMENTED YET !*/
    return this.http.get(`${this.url}/${id}`)
  }

  deletePie(id: number) { /**Delete data of one pie */
    return this.http.delete<Pie[]>(`${this.url}/${id}`)
  }

  deletePies(ids: Array<number>) { /** Delete data of multiples pies. IMPORTANT: NOT IMPLEMENTED YET ! */
    console.log("TODAVIA NO ESTA HABILITADO")
  }
}
