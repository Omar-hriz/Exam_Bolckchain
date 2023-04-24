// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TireLire is ERC20, Ownable{
    mapping(address => uint256)public balances;
    mapping(address => uint256)public time;
  
    constructor() ERC20("TireLire", "TRL") {    
    }
    function depositFunds()public payable{
        if(time[msg.sender] == 0){
            balances[msg.sender] += msg.value;
            time[msg.sender] = block.timestamp;
        (bool suc,) = address(this).call{value:msg.value}("");
        }else{
           (bool suc,) = msg.sender.call{value:msg.value}(""); 
        }
    }
    function withdrawfunds()public payable{}
} 