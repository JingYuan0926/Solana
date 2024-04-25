// import React, { useContext, createContext } from "react";
// import {  useContract, useContractWrite, useContractRead } from 'thirdweb/react';
// import { ethers } from 'ethers';

// const StateContext = createContext();

// export const StateContextProvider = ({ children }) => {
    
//     const { contract } = useContract("0x9CFfF3aB3B561E47DDBCdfD928D0eBA956aBb3EA");

//     const { mutateAsync: createConcert } = useContractWrite(contract, "createConcert")

//     const address = useAddress();

//     const publishConcert = async (form) => {
//         try {
//             // Need to write the word args
//             // Follow the documentation everytime
//             const data = await createConcert({
//                 args: [
//                     form.name,
//                     form.description,
//                     form.description,
//                     form.target,
//                     new Date(form.deadline).getTime(),
//                     form.image]
//             });
//             console.log("contract call success", data);
//         }
//         catch (error) {
//             console.log("contract call fail", error);
//         }
//     }

//     return (
//         <StateContext.Provider value={{  }}>
//             {children}
//         </StateContext.Provider>
//     );
// }

// export const useStateContext = () => useContext(StateContext);