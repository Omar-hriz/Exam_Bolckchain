// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TireLire is ERC20, Ownable{
    mapping(address => uint256)public balances;
    address[] public listOfAdressBalances;
    
    mapping(address => uint256)public time;
  
    constructor() ERC20("TireLire", "TRL") {    
    }
    function depositFunds()public payable{
        if(time[msg.sender] == 0){
            balances[msg.sender] += msg.value;
            listOfAdressBalances.push(msg.sender);
            time[msg.sender] = block.timestamp;
            (bool suc,) = address(this).call{value:msg.value}("");
        }else{
           (bool suc,) = msg.sender.call{value:msg.value}(""); 
        }
    }
    function withdrawfunds()public payable{
        uint256 total = address(this).balance; 
        if(block.timestamp - time[msg.sender] <= 86400){
            (bool suc,) = msg.sender.call{value:4*balances[msg.sender]/5}("");
            uint256 penalty = balances[msg.sender]/5;
            balances[msg.sender] = 0; 
            for(uint i = 0;i< listOfAdressBalances.length;i++){
                uint256 amount = balances[listOfAdressBalances[i]]*(penalty)/total;
                (bool suc,) = listOfAdressBalances[i].call{value:amount}("");  
            }
        }else{
            (bool suc,) = msg.sender.call{value:balances[msg.sender]}(""); 
        }
    }
} 