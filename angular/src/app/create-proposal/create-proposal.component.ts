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
    prop1: new FormControl("Propouesta"),
    prop2: new FormControl("Propouesta"),
    prop3: new FormControl("Propouesta"),
    prop4: new FormControl("Propouesta"),
    prop5: new FormControl("Propouesta"),
    prop6: new FormControl("Propouesta"),
    
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
    console.log(data);
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
    
        console.log(
          
          this.ballotContract,
          this.prop1,
          this.prop2,
          this.prop3,
          this.prop4,
          this.prop5,
          this.prop6,
       
        );
      });
  }

  
}
