import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ethers } from 'ethers';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { VoteComponent } from './vote/vote.component';
import { NewVoteComponent } from './new-vote/new-vote.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateProposalComponent,
    VoteComponent,
    NewVoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
