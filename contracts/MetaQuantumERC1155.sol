// SPDX-License-Identifier: MIT



























pragma solidity ^0.8.4;

import {ERC1155SupplyUpgradeable, ERC1155Upgradeable, ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
//import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";

//OpenSea Meta Transactions
import {AccessControlMixin, AccessControlUpgradeable} from "./common/AccessControlMixin.sol";
import {NativeMetaTransaction} from "./common/NativeMetaTransaction.sol";
import {ContextMixin} from "./common/ContextMixin.sol";
//Royalties
import "./rarible/impl/RoyaltiesV2Impl.sol";
import "./rarible/royalties/contracts/LibPart.sol";
import "./rarible/royalties/contracts/LibRoyaltiesV2.sol";
import "./rarible/royalties/contracts/RoyaltiesV2.sol";
import "./common/string.sol";


contract  MetaQuantumERC1155 is
    ERC1155SupplyUpgradeable,
    PausableUpgradeable,
    OwnableUpgradeable,
    AccessControlMixin,
    NativeMetaTransaction,
    ContextMixin,
    RoyaltiesV2Impl,
    UUPSUpgradeable
{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    // Contract name
    string public name;
    // Contract symbol
    string public symbol;
    // Initial Contract URI
    string private CONTRACT_URI;
    // Max total supply
    uint256 public MAX_TOTAL_SUPPLY;
    // Max token IDs
    uint256 public MAX_TOKEN_ID;

    mapping(uint => string) public ipfsHashPerTokenId;
     
    using AddressUpgradeable for address;
	using SafeMathUpgradeable for uint256; 
    using CountersUpgradeable for CountersUpgradeable.Counter;
    using strings for *;

    CountersUpgradeable.Counter private _tokenIdCounter;

    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;
    uint256 private constant MAX_INT_NUMBER = 115792089237316195423570985008687907853269984665640564039457584007913129639935;

    event CreateID(uint256 tokenId);

    function initialize (
      string memory name_,
      string memory symbol_,
      string memory uri_,
      string memory _contractURI,
      address minterRole,
      address owner_,
      uint256 maxTotalSupply_,
      uint256 maxTokenId_
    )
        initializer
        public
    {

        __ERC1155_init(uri_);
        __ERC1155Supply_init();
        __Pausable_init();
        __Ownable_init();

        
        _setupContractId("MetaQuantumERC1155");
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender()); 
        _setupRole(MINTER_ROLE, minterRole);
        _setURI(uri_);
        transferOwnership(owner_);
        _initializeEIP712(uri_);

        name = name_;
        symbol = symbol_;
        CONTRACT_URI = _contractURI;
        MAX_TOTAL_SUPPLY = maxTotalSupply_== 0 ? MAX_INT_NUMBER : maxTotalSupply_;
        MAX_TOKEN_ID = maxTokenId_ == 0 ? MAX_INT_NUMBER : maxTokenId_;
        
    }

    // This is to support Native meta transactions
    // never use msg.sender directly, use _msgSender() instead
    function _msgSender()
        internal
        override
        view
        returns (address sender)
    {
        return ContextMixin.msgSender();
    }

    /**
     * Override isApprovedForAll to auto-approve OS's proxy contract
     */
    function isApprovedForAll(
        address _owner,
        address _operator
    ) public override view returns (bool isOperator) {
        // if OpenSea's ERC1155 Proxy Address is detected, auto-return true
       if (_operator == address(0x207Fa8Df3a17D96Ca7EA4f2893fcdCb78a304101)) {
            return true;
        }
        if (_operator == owner()) {
            return true;
        }

        // otherwise, use the default ERC1155.isApprovedForAll()
        return ERC1155Upgradeable.isApprovedForAll(_owner, _operator);
    }


    /**
     * @notice  Make the SetTokenURI method visible for future upgrade of metadata
     * @dev Sets `_tokenURI` as the tokenURI for the `all` tokenId.
     */
    function setURI(string memory _tokenURI) public virtual only(DEFAULT_ADMIN_ROLE) {
        _setURI(_tokenURI);
    }

 /**
     * @notice  Method for reduce the friction with openSea allows to map the `tokenId`
     * @dev into our NFT Smart contract and handle some metadata offchain in OpenSea
     */
    function uri(uint256 tokenId) public view override returns (string memory) {  
        string memory uri_ = ERC1155Upgradeable.uri(tokenId);
        return _stringReplace(uri_, "?", ipfsHashPerTokenId[tokenId]);
    }

     function _stringReplace(string memory _string, string memory _character, string memory _letter) internal pure returns (string memory) {
        strings.slice memory s = _string.toSlice();                
        strings.slice memory delim = _character.toSlice();                            
        string[] memory parts = new string[](3);                  
        parts[0] = s.split(delim).toString();
        parts[1] = _letter;
        parts[2] = s.split(delim).toString();      
        return string(abi.encodePacked(parts[0], parts[1],parts[2]));                                        
    } 

    /**
     * @notice Method for reduce the friction with openSea allows to map the `tokenId`
     * @dev into our NFT Smart contract and handle some metadata offchain in OpenSea
    */
    function contractURI() public view returns (string memory) {
        return CONTRACT_URI;
    }

    /**
     * @notice Method for reduce the friction with openSea allows update the Contract URI
     * @dev This method is only available for the owner of the contract
     * @param _contractURI The new contract URI
     */
    function setContractURI(string memory _contractURI) public only(DEFAULT_ADMIN_ROLE) {
        CONTRACT_URI = _contractURI;
    }

      /**
      * @dev Method, for verify the TotalSupply of the NFT, each time to mint a new NFT Token
      * @param _id The id of the NFT Token
      * @param _amount The amount of the NFT Token
      * @return The amount of the NFT Token to mint
      */
    function restTotalSupply(uint256 _id, uint256 _amount) public view returns (uint256) {
      uint256 subtotal = totalSupply(_id)+_amount;
      require(( subtotal <= maxSupply(_id)), "EXCEED MAX_AMOUNT");
      return _amount;
    }

     /**
     * @notice Method for getting Max Supply for Token
     * @dev This method is for getting the Max Supply by token id
     * @param _id The token id
     */
    function maxSupply(uint256 _id) public view returns (uint256 _maxSupply) {
          _maxSupply = MAX_TOTAL_SUPPLY;
    }

    /**
     * @dev Implementation / Instance of paused methods() in the ERC1155.
     * @param status Setting the status boolean (True for paused, or False for unpaused)
     * See {ERC1155Pausable}.
     */
    function pause(bool status) public onlyOwner() {
        if (status) {
            _pause();
        } else {
            _unpause();
        }
    }

    /**
     * @notice Method for getting OpenSea Version we Operate
     * @dev This method is for getting the Max Supply by token id
     */
    function openSeaVersion() public pure returns (string memory) {
        return "2.1.0";
    }

     /**
     * @notice create Unique ID based in counter
     * @dev This implementation only return [] sequence ids
     * but can be changed as per requirement
     */
    function createUniqueID(uint256 totalIds) external only(MINTER_ROLE) {
       for(uint i = 0; i < totalIds; i++){ 
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current(); 
        emit CreateID(tokenId);
       }   
    }
    /**
     * @notice See definition of `_mintBatch` in ERC1155 contract
     * @dev This implementation only allows admins to mint tokens
     * but can be changed as per requirement
     */
     function bulkMint(address to, string calldata metadataIpfsHash_,uint256[] calldata ids,uint256[] calldata amounts,bytes calldata data) external only(MINTER_ROLE) {
         
        require(address(to) != address(0), 'Address invalid');
        require(
            ids.length > 0,
            "Quantity of nfts must be higher than zero"
        );
        require(
            amounts.length > 0,
            "Quantity of nfts must be higher than zero"
        );

        for(uint i = 0; i < ids.length; i++){ 
            require(((ids[i] > uint(0)) && (ids[i] <= uint(MAX_TOKEN_ID))), "INVALID_TOKEN_ID");
            require(((amounts[i] > uint(0)) && (amounts[i] == restTotalSupply(ids[i], amounts[i]))) , "INVALID_TOKEN_AMOUNT");
            ipfsHashPerTokenId[ids[i]]=metadataIpfsHash_;
        }

        
        _mintBatch(to, ids, amounts, data);
       
    }

   

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155Upgradeable, AccessControlUpgradeable) returns (bool) {
        if(interfaceId == LibRoyaltiesV2._INTERFACE_ID_ROYALTIES) {
            return true;
        }
        if(interfaceId == _INTERFACE_ID_ERC2981) {
            return true;
        }
        return super.supportsInterface(interfaceId);
    }


    function burn(
        address account,
        uint256 id,
        uint256 value
    ) public virtual {
        require(
            account == _msgSender() || isApprovedForAll(account, _msgSender()),
            "caller is not owner nor approved"
        );

        _burn(account, id, value);
    }

    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory values
    ) public virtual {
        require(
            account == _msgSender() || isApprovedForAll(account, _msgSender()),
            "caller is not owner nor approved"
        );

        _burnBatch(account, ids, values);
    }

    /**
     * @dev See {ERC1155Upgradeable-_beforeTokenTransfer}.
     *
     * Requirements:
     *
     * - the contract must not be paused.
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        require(!paused(), "ERC1155PausableUpgradeable: token transfer while paused");

        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

      function setRoyalties(uint _tokenId, address payable _royaltiesReceipientAddress, uint96 _percentageBasisPoints) public onlyOwner {
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = _percentageBasisPoints;
        _royalties[0].account = _royaltiesReceipientAddress;
        _saveRoyalties(_tokenId, _royalties);
    }

    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount) {
        LibPart.Part[] memory _royalties = royalties[_tokenId];
        if(_royalties.length > 0) {
            return (_royalties[0].account, (_salePrice * _royalties[0].value)/10000);
        }
        return (address(0), 0);
    }

     function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

     
} 