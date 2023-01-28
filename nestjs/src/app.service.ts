import { Injectable, Provider } from '@nestjs/common';
import { BigNumber, ethers, providers } from 'ethers';
import * as tokenJson from "./assets/MyToken.json";
import * as tokenJson2 from "./assets/TokenizedBallot.json";
import { parseEther } from 'ethers/lib/utils';
import { convertToBytes32Array, isBalanceZero } from './utils/util';
import { TokenizedBallot__factory } from 'typechain-types';
// import { CreateEHRDto } from './dto/ehr.dto';
import { Proposals } from './entities/ehr.entity';
import { Proposal } from './dto/ehr.dto';



const ERC20VOTES = "0x3A4a8459f38e131fa5071a3E0444E64313F7343E"
const ERC20VOTES2023 = "0x0728489fCF6381D383bC4C392B6C35dC88d7F190"
const ballotAddress= "0x06157a790bc1b3f4f337859686c32f0123084331"
const ballotAddress2023="0xA3f3E4E892da4D7aa1a0e002F71bbC6398F8c15F"

const MINT_VALUE = ethers.utils.parseEther("10");


@Injectable()
export class AppService {
  
provider: ethers.providers.BaseProvider;
erc20Contract: ethers.Contract;
signer: ethers.Wallet;
account: string | undefined;
erc20ContractFactory: ethers.Contract;
  ballotContractFactory: ethers.ContractFactory;
  ballotContract: any;
  contractAddress: any;




constructor() {
  const provider = new ethers.providers.InfuraProvider("goerli", { infura: 'INFURA_API_KEY' })
   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '');
  this.signer = wallet.connect(provider)
  const erc20ContractFactory = new ethers.ContractFactory(
    tokenJson.abi,
    tokenJson.bytecode,
    this.signer
    );
  this.erc20Contract = erc20ContractFactory.attach(ERC20VOTES2023)
  
  this.ballotContractFactory = new ethers.ContractFactory(
    tokenJson2.abi,
    tokenJson2.bytecode,
    this.signer
  );
  this.ballotContract = this.ballotContractFactory.attach(ballotAddress2023)
//  console.log(provider)
 const BN = provider.getBlockNumber
 console.log(BN)
}

getTokenAddress() {
 return ERC20VOTES2023;
}


async requestTokens(body: any) {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '');
  const signer = wallet.connect(this.provider);
  const erc20Contract = this.erc20Contract.attach(ERC20VOTES2023).connect(this.signer);
  console.log(signer);
  console.log(this.erc20Contract);
  // mint tokens here
  const mintTokens = await erc20Contract.mint(body.address, MINT_VALUE);
  console.log(`Minting complete! Tx hash: ${mintTokens.hash}`)
  console.log(`Tokens minted successfully to ${body.address}, the transaction can be found at ${mintTokens.hash}`);
  const delegateTx = await erc20Contract.delegate(body.address);
  await delegateTx.wait()
  console.log(`Delegation  Tx hash: ${delegateTx.hash}`)
  
  return mintTokens.wait();
  
  
}
async vote(body: number) {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '');
  const signer = wallet.connect(this.provider);
  const ballotContract = this.ballotContract.attach(ballotAddress2023).connect(this.signer)
  const vote= await ballotContract.vote(1, ethers.utils.parseEther("1"))
  return vote.wait();
}

async deployContract(data: string[]) {
  console.log('Deploying contract', data);
  let contract = null;
  if (await isBalanceZero(this.signer)) {
    throw new Error('Not enough balance to deploy contract');
  }
  
 
  const provider = new ethers.providers.InfuraProvider("goerli", { infura: 'INFURA_API_KEY' });
  const BN = await provider.getBlockNumber();
   console.log(BN)
  const contractFactory = new TokenizedBallot__factory(this.signer);
  contract = await contractFactory.deploy(convertToBytes32Array(data), ballotAddress2023, BN );
  await contract.deployed();
  return { address: contract.address, hash: contract.txHash };
}
 
// End point to create EHR metadata (Ken)
// Patient create EHR data first time, contract deployment  (Ken)
async create(req: Proposal): Promise<{
  contractAddress: string;
  data: Proposals;
}> {
  const data = [
    req.prop1,
    req.prop2,
    req.prop3,
    req.prop4,
    req.prop5,
    req.prop6,

  ];
  return await this.deployContract(data).then(({ address }) => {
    this.contractAddress = address;
    const result = { contractAddress: address, data: req };
    console.log('Contract deployed', result);
    return result;
  });
}

async getProposals() {
  const ballotContract = this.ballotContractFactory
    .attach(ballotAddress)
    .connect(this.provider);
  async function viewProposals(numberOfProposals: number) {
    const proposalNames = [];
    for (let i = 0; i <= numberOfProposals - 1; i++) {
      let proposalName = await ballotContract.proposals(i);
      proposalName = ethers.utils.parseBytes32String(proposalName.name);
      proposalNames.push(proposalName);
    }
    return proposalNames;
  }
  const proposals = viewProposals(3);
  return proposals;
}
}
