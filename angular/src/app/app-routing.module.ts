import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import { AppComponent } from './app.component';
import { VoteComponent } from './vote/vote.component';
import { NewVoteComponent } from './new-vote/new-vote.component';
const routes: Routes = [

 { path:"create-proposal", component: CreateProposalComponent},
 { path:"vote", component: VoteComponent},
 { path:"newVote", component: NewVoteComponent},
 { path: '', redirectTo: '/vote', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
