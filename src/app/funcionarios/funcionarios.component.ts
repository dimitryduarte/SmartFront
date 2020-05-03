import { Component, OnInit, DoCheck, Input, OnChanges  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Funcionario} from '../funcionario';
import {FuncionarioService} from '../funcionario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  constructor(private funcionarioService: FuncionarioService) { }

  func: any = {};
  uf: any = {};
  req: any = {};
  funcionario: any = {};  
  salInicial: string;
  salFinal: string;

  ngOnInit() {
    this.funcionariosUF(); 
    this.req.tipo = 0;
  }

  funcionariosUF(){
    this.uf = this.funcionarioService.getFuncionariosUf();
  }

  funcionarios(){
    if (this.req.tipo == 0){
      this.func = this.funcionarioService.getFuncionario();
    } else if(this.req.tipo == 1){
      this.func = this.funcionarioService.getFuncionarioNome(this.req.pesquisar);  
    } else if(this.req.tipo == 2){
      this.func = this.funcionarioService.getFuncionarioCpf(this.req.pesquisar);
    } else if(this.req.tipo == 3){
      this.func = this.funcionarioService.getFuncionarioCargo(this.req.pesquisar);
    } else if(this.req.tipo == 4){
      this.func = this.funcionarioService.getFuncionarioData(this.req.pesquisar);
    } else if(this.req.tipo == 5){
      this.func = this.funcionarioService.getFuncionarioStatus(this.req.pesquisar);
    } else if(this.req.tipo == 6){
      let salarios = this.req.pesquisar.split("/");
      if (salarios[0] == null){salarios[0] = 0;}
      if (salarios[1] == null){salarios[1] = 0;}
      this.salInicial = salarios[0];
      this.salFinal = salarios[1];
      this.func = this.funcionarioService.getFuncionarioSalario(this.salInicial, this.salFinal);
    }
  }

  excluirFuncionario(cpf: string){
    Swal.fire({
      title: 'Você está certo disso?',
      text: "O funcionário será permanentemente removido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0e89ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, quero deletar!'
    }).then((result) => {
      if (result.value) {
        this.funcionarioService.deleteFuncionarioCpf(cpf)
        Swal.fire(
          'Funcionário Deletado!',
          'O funcionário foi removido com sucesso =D !',
          'success'
        );        
      }
    })
  }
  
  editarFuncionario(vFunc: any){
    this.funcionario.status = vFunc.Status;
    this.funcionario.cargo = vFunc.Cargo;
    this.funcionario.cpf = vFunc.Cpf;
    this.funcionario.nome = vFunc.Nome;
    this.funcionario.ufnasc = vFunc.UfNasc;
    this.funcionario.salario = vFunc.Salario;                    
  }
  
  novoFuncionario(){
    this.funcionario.status = null;
    this.funcionario.cargo = null;
    this.funcionario.cpf = null;
    this.funcionario.nome = null;
    this.funcionario.ufnasc = null;
    this.funcionario.salario = null;                    
  }
  
  salvarFuncionario(){
    this.funcionarioService.postFuncionario(  this.funcionario.status,
                                              this.funcionario.cargo,
                                              this.funcionario.cpf,
                                              this.funcionario.nome,
                                              this.funcionario.ufnasc,
                                              this.funcionario.salario);
    Swal.fire(
      'Funcionário Salvo!',
      'Funcionário salvo com sucesso!',
      'success'
    )                                               
  }

}
