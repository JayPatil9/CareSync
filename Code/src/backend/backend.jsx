import Web3 from 'web3';
import { contractABI } from './data';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

const initialize = async (setWeb3,setContract,setAddress) => {
    // Check if web3 is injected by the browser (Mist/MetaMask)
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        // Get the user's accounts
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);

        // Get the contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        setContract(contract);
        // console.log("My address: ",accounts[0]);
      } catch (error) {
        console.error('Error initializing Web3:', error);
        alert(
          'An error occurred while initializing Web3. Please make sure you have MetaMask installed and try again.'
        );
      }
    } else {
      alert('Please install MetaMask!');
    }
  };


const addPatient = async (web3,address,contract,ipfsHash) => {
    try {

        const txObject = {
          from: address,
          to: contractAddress,
          data: contract.methods.addPatient(ipfsHash,address).encodeABI(),        
          gas: 2000000,
        };
        const txHash = await web3.eth.sendTransaction(txObject);
        // console.log(txHash);
        
      } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
      }
};

const getPatient = async (address,contract) => {
    try {
        const patient = await contract.methods.getPatient(address).call();
        // console.log(patient);
        // console.log(typeof(patient));
        return patient;
    } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
        return "error";
    }
}

const upload_image = async (pinata,imgFile) => {
  try {
      const response = await pinata.upload.file(imgFile);
      return response.IpfsHash;
  } catch(error) {
      console.error("Error uploading the image:", error);
      return "Error";
  }
};

export {initialize,addPatient,getPatient,upload_image};