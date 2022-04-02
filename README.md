# Block Xplorers

<h3>Introduction</h3>
Hey Everyone we are a team of students from Singapore Management University taking part in Hack Singapore - https://hacksingapore.com/ - For this hackathon we chose to address the challenge statement by the Era of Blockchain and Trust which was to submit a project by referencing the TradeTrust framework - https://github.com/TradeTrust - and propose Ethereum scaling solutions such as layer 2s,rollups and even alternative chains!
<h3>Chain Chosen</h3>
Our team first wanted to understand the major requirements for a non-ethereum blockchain outlined by the Trade Trust framework which were:
<br><br>
<ul>
  <li>Public</li>
  <li>Permissionless</li>
  <li>Supports NFTs (erc721) / Smart Contracts</li>
  <li>Accessibility of Blockchain State</li>
  <li>Impartial Security Model</li>
  <li>Economically Secured</li>
  <li>Open-Sourced</li>
</ul>
<br>
From these major requirements we distilled our choices into three key blockchains, that being Avalanche, Polygon as well as Build and Build (BNB), formerly known as Binance Smart Chain (BSC). All three of these chains are relatively popular, have a faster time to finaility, higher throughput and lower gas fees as compared to Ethereum. When doing our internal comparsions we decided on Avalanche as our chain of choice!

<h3>Evaluation</h3>
<p>Avalanche managed to edge out both Polygon and BNB for several Reasons as listed below</p>
<h4>Subnetting</h4>
Avalanche allows for ‘subnetting’, which are new networks in the Avalanche ecosystem. Each subnet can have multiple blockchains like the primary Avalanche network, with each blockchain having the ability to have its own consensus model. Each subnet can be private or public,  permissioned or permissionless. Governments can take advantage of these tools afforded by Avalanche without investing much and leverage on the security afforded by the primary network. Compliance to the TradeTrust framework can also be ensured by customising the rules for each subnet. The ability to create subnets is absent in both Polygon and BNB.
<h4>Consensus</h4>
<p>Avalanche relies on Snowman Consensus which consists of a family of protocols. These include the Slush Alogrithm which maintains Metastability, the Snowflake algorithm which ensures Conviction, the Snowball Alogrithm which determines Confidence and finally the Avalanche Alogrithm which confirms transactions.</p>
<p>Snowman Consensus ensures safety as the blockchain will always have a valid state transition based on the redundancies in place. Liveness is also achieved as anyone can send in transactions while majority consensus can be reached extremely quickly based on node association and the directed acyclic graph structure of the Avalanche primary network. Both safety and liveness contribute to a highly accessible blockchain state.</p>
<p>At the time of writing this, Avalanche also has 1351 active validators on the network, which is considerably higher than that of Polygon and BNB which have 100 and 21 validators respectively. The large number of validators on Avalanche ensures immutability and censorship resistance.
<h4>Community</h4>
<p>Avalanche is a highly inclusive platform, where anyone is able to connect to the priamry network and engage in validation and first hand governance. Any token holder can have a vote in selecting key financial parameters, choosing and helping guide the evolution of Avalanche</p>
<p>Avalanche has also a rich pool of developers and incentive programmes to support the creation of new projects. Their newest incentive programme targeted at growing the Avalanche Multiverse will be funded with 4 million AVAX tokens or about $290 million US dollars. Programmes such as this are lacking on both Polygon and BNB</p> 
<p>An active community of developers bodes well for the future of the Avalanche, which provides more opportunities to add greater functionality to the Tradetrust framework in the future if needed. </p>
<h4>Interoperability</h4>
<p>Avalanche is designed to be a universal and flexible infrastructure for a multitude of blockchains, where the primary network is used for security and the AVAX token as a unit of account for exchange. The system is intended to support, in a value-neutral fashion, many blockchains to be built on top. The platform is designed from the ground up to make it easy to port existing blockchains onto it, to import balances, to support multiple scripting languages and virtual machines, and to meaningfully support multiple deployment scenarios. This allows Avalanche to operate well in a Mutichain ecosystem which will likely be the nature of the Blockchain Space in the coming years</p>
<h4>Shortcomings</h4>
<p> In early 2021, a heavy laod on the Avalanche network triggered a non-deterministic bug related to state verification. This caused some validators to accept some invalid mint transactions, while the rest of the network refused to honor these transactions and stalled the C-chain. Avalanche's transactions are irreversible and conflicting transactions would result in the stoppage of the liveness in the nework while maintaining safety.</p>

<h3>Conclusion and Deployment</h3>
<p>All in All, for the reasons describe above, Avalanche is the best alternative to Ethereum for the deployment of the TradeTrust framework. In other to showcase how the TradeTrust framework could be shifted to other chains, The Block Xplorers have created a web application! Our tech stack consists of React for our front-end framework, the basedocumentstore contract from Tradetrust for our back-end smart contract, the Avalanche C-Chain for deployment and the use of Netlify as a hosting server. The link to the web application can be found here https://blockxplorers.netlify.app/!</p>


