import { Component, inject } from '@angular/core';
import { BigNumber, Contract, ethers, providers, Signer, Wallet } from 'ethers';
import tokenJson from '../assets/MyToken.json';
import tokenJson2 from "../assets/TokenizedBallot.json"
import { Bytes, BytesLike, formatBytes32String, formatEther, formatUnits, getAddress, hexValue, isAddress, parseBytes32String, parseEther } from 'ethers/lib/utils';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public userData: string | undefined;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  MenuSelected?: number ;
  tokenContractAddress: string | any;
  wallet: ethers.Wallet | undefined 
  provider: ethers.providers.InfuraProvider| any
  etherBalance: string | undefined
  tokenBalance: string | undefined
  votePower: string | undefined
  tokenContract: ethers.Contract | any |string
  ballotContract: ethers.Contract |  any
  wallet2: undefined
  
  
  
  signer: ethers.providers.JsonRpcSigner | undefined 
  winner: string | undefined
  voteBaBn: string | undefined
  voteBa: string | undefined

  proposals: BigNumber| undefined;
  winnerProposal: string | undefined
  proposals1: BigNumber| undefined;
  proposals2: BigNumber| undefined;
  proposals3: string | undefined;
  proposals4: string | undefined;
  proposals5: string | undefined;
  proposals6: string | undefined;

  voteBalance: number|undefined
  accounts: string | undefined;
  convertToBytes: string | undefined
  // accounts: ethers.Wallet | undefined
  // formattedArray: any | undefined

  propppp: Promise<any> | undefined;
  proposalNames: [] | undefined;
  proposalName: Promise<string> | undefined
  proposals0: BigNumber| undefined;
  providerGoerliJSON: ethers.providers.InfuraProvider | undefined
  // proposalNames: undefined
  // proposalN1: undefined

 //HCP acces to patient info
 patientName?: string;
 dob?: string;
 heartRate?: number;
 bloodPressure?: string;
 oxygenSaturation?: number;
 temperature?: number;
 // Owner HCP access patient info page variables
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

  

  constructor(private http: HttpClient){}
  
  async start() {
  
    // this.wallet = ethers.Wallet.createRandom().connect(this.provider)
    // this.signer = (this.wallet).connect(this.provider)
    this.providerGoerliJSON = new ethers.providers.InfuraProvider("goerli", { infura: 'INFURA_API_KEY' })
  // this.wallet = new ethers.Wallet((this.PRIVATE_KEY))
 
  this.provider = new ethers.providers.Web3Provider(window.ethereum)
// const accounts = await this.provider.send("eth_requestAccounts", [])
  // console.log(accounts);
  const signer = this.provider.getSigner()
 this.wallet = await  signer.getAddress()
 

 const BN = await this.providerGoerliJSON.getBlockNumber()

  
  // this.wallet = await window.ethereum.request({ method: "eth_accounts" });
  // this.provider = new ethers.providers.Web3Provider(window.ethereum);
  // this.signer = await this.provider.getSigner();

//  console.log( signer, this.provider, this.wallet, "222")
  
 this.http
    .get<any>("https://vote-lzna.onrender.com/token-address")
    .subscribe((ans) => {
     this.tokenContractAddress = ans.result;
    if (this.tokenContractAddress && this.wallet) {
    this.tokenContract = new ethers.Contract(
    this.tokenContractAddress,
    tokenJson.abi,
    signer 
    );
    // this.tokenContract = this.tokenContract.attach(environment.tokenContract).connect(signer)
    const ans = this.tokenContract
  signer.getBalance().then((balanceBn: ethers.BigNumberish) => {
    this.etherBalance = (ethers.utils.formatEther(balanceBn))
    // this.etherBalance = parseFloat(ethers.utils.formatEther(balanceBn))
    
  });

  
  this.tokenContract["balanceOf"](signer.getAddress()).then(
    (tokenBalanceBn: BigNumber) => {
    this.tokenBalance =  (
      ethers.utils.formatEther(tokenBalanceBn)
      );
  });
  this.tokenContract["getVotes"](signer.getAddress() ).then(
    (votePowerBn: string) => {
    this.votePower = (ethers.utils.formatEther(votePowerBn)
    );
    });
    }
   })
    
    this.ballotContract = new ethers.Contract(
      environment.ballotContract,
      tokenJson2.abi,
      signer
    )

    this.ballotContract = this.ballotContract.attach(environment.ballotContract).connect(signer)
    
    this.ballotContract["winnerName"]().then(
      (winners: string) => {
        this.winner = parseBytes32String(winners)
        })
      this.ballotContract["winningProposal"]().then(
          (winnerProposal: string) => {
            this.winnerProposal = (winnerProposal)
            }) 

            this.ballotContract["proposals"]([0]).then(
              (proposals0: any) => {
                proposals0 = ethers.utils.parseBytes32String(proposals0.name);
                // console.log(proposals0)
                this.proposals0 = proposals0
               })
      this.ballotContract["proposals"]([1]).then(
        (proposals1: any) => {
          proposals1 = ethers.utils.parseBytes32String(proposals1.name);
          this.proposals1 = proposals1
         })
      this.ballotContract["proposals"]([2]).then(
        (proposals2: any) => {
          proposals2 = ethers.utils.parseBytes32String(proposals2.name);
          this.proposals2 = proposals2
         })
        this.ballotContract["proposals"]([3]).then(
              (proposals3: any) => {
                proposals3 = ethers.utils.parseBytes32String(proposals3.name);
                this.proposals3 = proposals3
               })
               this.ballotContract["proposals"]([4]).then(
                (proposals4: any) => {
                  proposals4 = ethers.utils.parseBytes32String(proposals4.name);
                  this.proposals4 = proposals4
                 })
                 this.ballotContract["proposals"]([5]).then(
                  (proposals5: any) => {
                    proposals5 = ethers.utils.parseBytes32String(proposals5.name);
                    this.proposals5 = proposals5
                   })
                  //  this.ballotContract["proposals"]([6]).then(
                  //   (proposals6: any) => {
                  //     proposals6 = ethers.utils.parseBytes32String(proposals6.name);
                  //     this.proposals6 = proposals6
                  //    })
                   

             

              //  function convertToBytes(proposalsArray: string[]) {
              //   let formattedArray = []
              //   for (let i = 0; i < proposalsArray.length; i++) {
              //        formattedArray.push(ethers.utils.formatBytes32String(proposalsArray[i]))
              //        console.log(formattedArray)
              //   }
                
                          
              // }
                   
              this.getProposals() 
                const ballotContract = this.ballotContract
                  .attach(environment.ballotContract)
                  .connect(this.provider);
             
                const viewProposals = (numberOfProposals: number) => {
                  const proposalNames = [];
                  for (let i = 0; i <= proposalNames.length - 1; i++) {
                    let proposalName = ballotContract.proposals(i);
                    proposalName = ethers.utils.parseBytes32String(proposalName.name);
                    proposalNames.push(proposalName);
                    
                    // this.proposalNames =


                    console.log(proposalName)
                    // console.log(viewProposals(1))
                    // console.log(proposalNames)
                    
                  }
                  
                    return proposalNames;
                  }
                                }
             



              async getProposals() {
                const ballotContract = this.ballotContract
                  .attach(environment.ballotContract)
                  .connect(this.provider);
                async function viewProposals(numberOfProposals: number) {
                  const proposalNames = [];
                  for (let i = 0; i <= proposalNames.length - 1; i++) {
                    let proposalName = await ballotContract.proposals(i);
                    proposalName = ethers.utils.parseBytes32String(proposalName.name);
                    proposalNames.push(proposalName);
                    console.log(proposalName)
                    // console.log(viewProposals)
                    // console.log(proposalNames)
                  }
                  // console.log(proposalNames)  
                  return proposalNames;
                    
                  }
                  const proposals = viewProposals(3);
                  return proposals;
                  
                }
          
                         
      

  // async request(mintAmount: string){
  //               // console.log("mint and delegate to " + this.signer?._address, this.wallet?.address, this.accounts, this.signer?.connect);
  //               this.http
  //               .post<any>('https://vote-lzna.onrender.com/request-tokens', {address: this.wallet, amount: mintAmount})
  //               .subscribe((ans) => {
  //                 console.log(ans);
  //                 console.log(this.tokenContractAddress)
  //                 console.log(mintAmount)
  //               });

  // }
  
  voteP = ethers.utils.parseEther("10");

  async vote(voteId: number) {
  const vote = await this.ballotContract["vote"](voteId, BigNumber.from(100000000000000).div(100000000000000) )
  console.log("trying to vote for " + voteId);
  await vote.wait()
  const voteTx = vote.hash
  console.log("hash of Vote" + voteTx)
  }


  async connectWallet() {
    const MetaMaskprovider = new ethers.providers.Web3Provider(window.ethereum)

await MetaMaskprovider.send("eth_requestAccounts", []);
  
const signer = MetaMaskprovider.getSigner();
  await signer.getAddress().then((address) => {
  // console.log(signer.getBalance(), "11111")
    
    const accounts = address
    // console.log(address, accounts, signer);
  
  } )
  this.start()
}

// Simple listener to callback on owner create EHR menu item
onCreateEHR(menuSelected: number) {
  // this.ownerMenuSelected = menuSelected;
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






// async getProposals() {
//   const props = await this.ballotContract['proposals'];
 
//   this.proposals.forEach((element:string, index:number) => {
//     console.log(`Proposal ${index}: ${element}`)
//   });
//   return this.proposals;
// }











//   async function proposal(proposalsArray: string[]) {

//   const proposal = await this.ballotContract['proposals'][num].name.then(()=>{
//   (proposal: string) => {
//     this.proposal = (proposal)
//    }
//                console.log(proposal(1));
//                return proposal
// })}
// proposal(1)