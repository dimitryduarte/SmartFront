import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from './funcionario';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FuncionarioService {

  endPoint: string = "https://localhost:44365/api/funcionarios";
  lista: Funcionario[] = []
  func: any
  uf: any  

  constructor(private http:HttpClient) { }

  getFuncionario(): any{
    this.http.get(this.endPoint).subscribe(dados => {
        this.func = dados;
        }, (erro) => {
        console.log(erro);            
    }); 
    return this.func;
  }

  getFuncionariosUf(): any{
    this.http.get(this.endPoint +'-por-uf').subscribe(dados => {
      this.uf = dados;
      }, (erro) => {
        console.log(erro);
    });
    return this.uf;       
  }

  getFuncionarioNome(nome: string): any{
    this.http.get(this.endPoint +'-nome?nome=' + nome).subscribe(dados => {
        this.func = dados;
        }, (erro) => {
          console.log(erro);
      });      
    return this.func;
  }

  getFuncionarioCpf(cpf: string): any{
    this.http.get(this.endPoint +'-cpf?Cpf=' + cpf).subscribe(dados => {
        this.func = dados;
        }, (erro) => {
          console.log(erro);
      });      
    return this.func;
  } 
  
  getFuncionarioCargo(cargo: string): any{
    this.http.get(this.endPoint +'-cargo?Cargo=' + cargo).subscribe(dados => {
        this.func = dados;
        }, (erro) => {
          console.log(erro);
      });      
    return this.func;
  } 
  
  getFuncionarioData(data: string): any{
    this.http.get(this.endPoint +'-data?data=' + data).subscribe(dados => {
        this.func = dados;
        }, (erro) => {
          console.log(erro);
      });      
    return this.func;
  } 
  
  getFuncionarioStatus(status: string): any{
    this.http.get(this.endPoint +'-status?status=' + status).subscribe(dados => {
        this.func = dados;
        }, (erro) => {
          console.log(erro);
      });      
    return this.func;
  }
  
  getFuncionarioSalario(salInicial: string, salFinal: string): any{
    this.http.get(this.endPoint +'-salario?SalInicial=' + salInicial + '&SalFinal=' + salFinal).subscribe(dados => {
        this.func = dados;
        }, (erro) => {
          console.log(erro);
      });      
    return this.func;
  }
  
  deleteFuncionarioCpf(cpf: string){
    this.http.delete(this.endPoint +'-cpf?Cpf=' + cpf).subscribe(dados => {  
          console.log(dados);     
        }, (erro) => {
          console.log(erro);
      });
  }

  postFuncionario(status: string,
                  cargo: string,
                  cpf: string,
                  nome: string,
                  ufnasc: string,
                  salario: string)
    {
      this.http.post(this.endPoint +'-post?modelo.cargo='+ cargo +
        '&modelo.cpf=' + cpf +
        '&modelo.nome='+ nome +
        '&modelo.ufNasc='+ ufnasc +
        '&modelo.salario='+ salario +
        '&modelo.status=' + status,null).subscribe(dados => {  
        console.log(dados);     
      }, (erro) => {
        console.log(erro);
    });
    }

}
