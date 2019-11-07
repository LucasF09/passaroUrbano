import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ordem-compra-sucesso',
  templateUrl: './ordem-compra-sucesso.component.html',
  styleUrls: ['./ordem-compra-sucesso.component.css']
})
export class OrdemCompraSucessoComponent implements OnInit {

  // @Input('idPedidoCompra') public idPedidoCompra: number
  //como é o memso nome nao há a necessidade de colocar dentro do input
  
  @Input() public idPedidoCompra: number

  constructor() { }

  ngOnInit() {
  }

}
