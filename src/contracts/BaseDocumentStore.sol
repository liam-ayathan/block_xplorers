// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;
// https://medium.com/michaels-dapp-dev-tips/how-to-change-the-solidity-compiler-in-vs-code-4c2660a856da
// if you have issues with the compiler ^


import "@openzeppelin/contracts/access/Ownable.sol";
// https://forum.openzeppelin.com/t/error-importing-openzeppelin-contracts-in-vscode/6971/4 
// npm install --save-dev @openzeppelin/contracts ^ - in case import does not work

// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// ^ could not get this import to function properly

contract BaseDocumentStore { // should be BaseDocumentStore is Initializable if second import is working
  string public name;
  string public version;

  /// A mapping of the document hash to the block number that was issued
  mapping(bytes32 => uint256) public documentIssued;
  /// A mapping of the hash of the claim being revoked to the revocation block number
  mapping(bytes32 => uint256) public documentRevoked;

  event DocumentIssued(bytes32 indexed document);
  event DocumentRevoked(bytes32 indexed document);

  // function initialize(string memory _name) public initializer { // only if second import is working
  //   version = "2.3.0";
  //   name = _name;
  // }

  function _issue(bytes32 document) internal onlyNotIssued(document) {
    documentIssued[document] = block.number;
    emit DocumentIssued(document);
  }

  function _bulkIssue(bytes32[] memory documents) internal {
    for (uint256 i = 0; i < documents.length; i++) {
      _issue(documents[i]);
    }
  }

  function getIssuedBlock(bytes32 document) public view onlyIssued(document) returns (uint256) {
    return documentIssued[document];
  }

  function isIssued(bytes32 document) public view returns (bool) {
    return (documentIssued[document] != 0);
  }

  function isIssuedBefore(bytes32 document, uint256 blockNumber) public view returns (bool) {
    return documentIssued[document] != 0 && documentIssued[document] <= blockNumber;
  }

  function _revoke(bytes32 document) internal onlyNotRevoked(document) returns (bool) {
    documentRevoked[document] = block.number;
    emit DocumentRevoked(document);
  }

  function _bulkRevoke(bytes32[] memory documents) internal {
    for (uint256 i = 0; i < documents.length; i++) {
      _revoke(documents[i]);
    }
  }

  function isRevoked(bytes32 document) public view returns (bool) {
    return documentRevoked[document] != 0;
  }

  function isRevokedBefore(bytes32 document, uint256 blockNumber) public view returns (bool) {
    return documentRevoked[document] <= blockNumber && documentRevoked[document] != 0;
  }

  modifier onlyIssued(bytes32 document) {
    require(isIssued(document), "Error: Only issued document hashes can be revoked");
    _;
  }

  modifier onlyNotIssued(bytes32 document) {
    require(!isIssued(document), "Error: Only hashes that have not been issued can be issued");
    _;
  }

  modifier onlyNotRevoked(bytes32 claim) {
    require(!isRevoked(claim), "Error: Hash has been revoked previously");
    _;
  }
}