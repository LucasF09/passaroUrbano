import { Component, OnInit } from '@angular/core'
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { Observable, Subject } from 'rxjs'
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'
import { of } from 'rxjs';

// import '../util/rxjs-extensions'


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject <string>()

  constructor(private ofertasService: OfertasService ) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000),
      distinctUntilChanged(), //busca se o termo for diferente do anterior
      switchMap((termo: string) => {
        if(termo.trim() === ''){
          //retornar um observable de array de ofertas vazio
          return of<Oferta[]>([])

        }
        return this.ofertasService.pesquisaOfertas(termo);
      }),

      catchError((err) =>{
        return of<Oferta[]>([])
      })
    )  // retorno de Oferta []
      
  }

  public pesquisa (termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
 
  }

  public limpaPesquisa (): void {
    this.subjectPesquisa.next('')
  }

}
