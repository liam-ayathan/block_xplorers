import React from 'react'

const Home = () => {
  return (
    <div className="d-flex align-items-center">
      <div className="container text-center">

        <div className="container my-3 p-3 section_area">
          <div className="m-3 p-3 section_area">
            <h2 className="desc">The Project</h2>
          </div>

          <div className='m-3 p-3 text_area'>
            <p>
              In light of the high gas fees on ethereum, Trade Trust is looking for an ideal alternative blockchain to migrate their smart contracts to.
            </p>
            <p>
             Thus, we had to understand the major requirements for a non-ethereum blockchain outlined by the Trade Trust. Based on those requirements, we distilled our choices into three key blockchains, that being Avalanche, Polygon as well as Build and Build (BNB), formerly known as Binance Smart Chain (BSC).
            </p>
            <p>
              The purpose of the prototype is to show that it is indeed possible for Trade Trust's solidity contracts to be deployed on EVM compatible chains and interacted with there.
            </p>
            <p>
              To get a deeper understanding of why we chose these three chains, check out the README on our GitHub repository <a href='https://github.com/liam-ayathan/block_xplorers'>here</a>.
            </p>          
          </div>
        </div>

        <div className="container my-3 p-3 section_area">
          <div className="m-3 p-3 section_area">
            <h2 className="desc">About Us</h2>
          </div>

          <div className='m-3 p-3 text_area'>
            <p>
              Hey everyone, we are a team of sophomores from Singapore Management University taking part in Hack Singapore. As tech enthusiasts, we have always been intruiged by blockchain. 
            </p>
            <p>
              That said, what better way to learn than through a hackathon. Hack Singapore provided a great platform for us to glean some insights from who are already in the industry and to explore the vast research that goes behind the various blockchains.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home