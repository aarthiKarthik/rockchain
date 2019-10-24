pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/utils/Address.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";


/**
 * @title OpsCoin token - ERC20 Token with callback function on SafeTransferToContract
 *
 * @dev Implementation of the OpsCoin token.
 */
contract EYCoin is ERC20Detailed, ERC20 {
  using Address for address;
  using SafeMath for uint256;
  address private owner;

  constructor (string memory name, string memory symbol, uint8 decimals, address initialAccount, uint256 initialBalance)
  ERC20Detailed(name, symbol, decimals) public {
    owner = msg.sender;
    _mint(initialAccount, initialBalance);
  }

  modifier onlyOwner() {
      require(msg.sender == owner, "Msg sender is not the owner");
      _;
  }

  /**
   * @dev Public function that mints an amount of the token into a given
   * account.
   * @param account The account whose tokens will be minted.
   * @param value The amount that will be minted.
   */
  function mint(address account, uint256 value) public onlyOwner {
    super._mint(account, value);
  }

  /**
   * @dev Public function that burns an amount of the token of a given
   * account.
   * @param account The account whose tokens will be burnt.
   * @param value The amount that will be burnt.
   */
  function burn(address account, uint256 value) public onlyOwner {
    super._burn(account, value);
  }

  /**
   * @dev Public function that burns an amount of the token of a given
   * account.
   * @param account The account whose tokens will be burnt.
   * @param value The amount that will be burnt.
   */
  function burnFrom(address account, uint256 value) public onlyOwner {
    super._burnFrom(account, value);
  }
}
