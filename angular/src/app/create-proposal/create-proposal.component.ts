import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.scss']
})
export class CreateProposalComponent implements OnInit {

   //Forms
 sub = new FormGroup({
  data: new FormGroup({
    prop1: new FormControl("Lionel Messi"),
    prop2: new FormControl("Julián Álvarez"),
    prop3: new FormControl("Ángel Di María"),
    prop4: new FormControl("Alexis Mac Allister"),
    prop5: new FormControl("Nahuel Molina Lucero"),
    prop6: new FormControl("Emiliano Martínez"),
    
  }),
});

 prop1: any;
 prop2: any;
 prop3: any;
 prop4: any;
 prop5: any;
 prop6: any;
  ballotContract: any;

 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  submitCreate(data: FormGroup) {
    console.log("send data, please await for a new smart contrat is deploted");
    this.http
      .post<any>('https://vote-lzna.onrender.com/create', {
        prop1: this.sub.value.data?.prop1,
        prop2: this.sub.value.data?.prop2,
        prop3: this.sub.value.data?.prop3,
        prop4: this.sub.value.data?.prop4,
        prop5: this.sub.value.data?.prop5,
        prop6: this.sub.value.data?.prop6,
  
      })
      .subscribe((ans) => {
        this.ballotContract = ans.contractAddress;
        this.prop1 = ans.data.prop1;
        this.prop2 = ans.data.prop2;
        this.prop3 = ans.data.prop3;
        this.prop4 = ans.data.prop4;
        this.prop5 = ans.data.prop5;
        this.prop6 = ans.data.prop6;
        
        console.log(`This is the Smart Contract that Mint and Delegate Voting Power in Goerli  + https://goerli.etherscan.io/address/${this.ballotContract}`)
      
        console.log(` 
          
           proposal 1 ${this.prop1} 
           proposal 2 ${this.prop2}
           proposal 3 ${this.prop3}  
           proposal 4 ${this.prop4}
           proposal 5 ${this.prop5}
           proposal 6 ${this.prop6}
          `);
      });
  }

  
}
