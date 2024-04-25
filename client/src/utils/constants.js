import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({ 
  clientId: import.meta.env.VITE_CLIENT_ID
 });

// connect to your contract
export const contract = getContract({ 
  client, 
  chain: defineChain(11155111), 
  address: "0x9CFfF3aB3B561E47DDBCdfD928D0eBA956aBb3EA"
});

export const chain = defineChain(11155111);