pragma solidity ^0.8.8;
import "@ensdomains/ens-contracts/contracts/registry/ENSRegistry.sol";
// import "./Resolver.sol";

/**
 * @dev A test resolver implementation
 */
contract TestResolver {
    ENS ens;

    mapping (bytes32 => address) addresses;



    function supportsInterface(bytes4 interfaceID) public pure returns (bool) {
        return interfaceID == 0x01ffc9a7 || interfaceID == 0x3b3b57de;
    }

    function addr(bytes32 node) public view returns (address) {
        return addresses[node];
    }

    function setAddr(bytes32 node, address addr) public {
        addresses[node] = addr;
    }
}
