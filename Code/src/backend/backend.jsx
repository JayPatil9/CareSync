import Web3 from 'web3';
import { contractABI } from './data';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const gateway = import.meta.env.VITE_GATEWAY;

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
        console.log("My address: ",accounts[0]);
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

const getContract = async () => {
    try {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        return contract;
    } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
    }
};

const getAddress = async () => {
    try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
    } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
    }
}


const setPatient = async (web3,address,contract,ipfsHash) => {
    try {

        const txObject = {
          from: address,
          to: contractAddress,
          data: contract.methods.setPatient(address,ipfsHash).encodeABI(),     
          gas: 2000000,
        };
        const txHash = await web3.eth.sendTransaction(txObject);
        // console.log(txHash);
        
      } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
      }
};

const getPatient = async (address,contract,setPatient) => {
    try {
        const patient = await contract.methods.getPatient(address).call();
        return getJson(patient,setPatient);
    } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
        return "error";
    }
}

const getVitals = async (address,contract,setVitals) => {
  try {
      const vitals = await contract.methods.getVitals(address).call();
      return getJson(vitals,setVitals);
  } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
      return "error";
  }
}

const getAppointments = async (address,contract,setAppointments) => {
  try {
      const appointments = await contract.methods.getNextAppointment(address).call();
      // console.log(appointments);
      return getJson(appointments,setAppointments);
  } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
      return "error";
  }
}

const getMyDoctors = async (address,contract,setMyDoctors) => {
  try {
      const doctors = await contract.methods.getPatientDoctors(address).call();
      setMyDoctors(doctors);
  } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
      return "error";
  }
}

const getJson = async (ipfsHash,setJSON) => {
  try {
    const response = await fetch(`https://${gateway}/ipfs/${ipfsHash}`);
    const data = await response.json();
    // console.log(data.date);
    setJSON(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
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

export {initialize,setPatient,getPatient,upload_image,getVitals,getAppointments,getMyDoctors,getContract,getAddress};