import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { AppComponent } from './app.component';
import { VoteComponent } from './vote/vote.component';
const routes: Routes = [

 { path:"create-proposal", component: CreateProposalComponent},
 { path:"vote", component: VoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
