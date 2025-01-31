import Web3 from 'web3';
import { contractABI } from './data';

export const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
export const gateway = import.meta.env.VITE_GATEWAY;
export const JWT = import.meta.env.VITE_JWT;

export const initialize = async (setWeb3,setContract,setAddress) => {
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
  }

export const getContract = async () => {
    try {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        return contract;
    } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
    }
}

export const getAddress = async () => {
    try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
    } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
    }
}


export const setPatient = async (web3,address,contract,ipfsHash) => {
    try {

        const txObject = {
          from: address,
          to: contractAddress,
          data: contract.methods.setPatient(address,ipfsHash).encodeABI(),     
          gas: 2000000,
        };
        const txHash = await web3.eth.sendTransaction(txObject);
        // console.log(txHash);
        return true;
      } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
        return false;
      }
}

export const addPatient = async (web3,address,contract,ipfsHash) => {
  try {

      const txObject = {
        from: address,
        to: contractAddress,
        data: contract.methods.addPatient(ipfsHash,address).encodeABI(),     
        gas: 2000000,
      };
      const txHash = await web3.eth.sendTransaction(txObject);
      return true;
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
      return false;
    }
}

export const setDoctor = async (web3,address,contract,ipfsHash) => {
  try {

      const txObject = {
        from: address,
        to: contractAddress,
        data: contract.methods.addDoctor(ipfsHash,address).encodeABI(),    
        gas: 2000000,
      };
      const txHash = await web3.eth.sendTransaction(txObject);
      return true;
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
      return false;
    }
}

export const getPatient = async (address,contract,setPatient) => {
    try {
        const patient = await contract.methods.getPatient(address).call();
        return getJson(patient,setPatient);
    } catch (error) {
        console.error('Error:', error);
        alert("There was an error!");
        return "error";
    }
}

export const getDoctor = async (address,contract,setDoctor) => {
  try {
      const doctor = await contract.methods.getDoctor(address).call();
      return getJson(doctor,setDoctor);
  } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
      return "error";
  }
}

export const getVitals = async (address,contract,setVitals) => {
  try {
      const vitals = await contract.methods.getVitals(address).call();
      return getJson(vitals,setVitals);
  } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
      return "error";
  }
}

export const getAppointments = async (address,contract,setAppointments) => {
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

export const getMyDoctors = async (address,contract,setMyDoctors) => {
  try {
      const doctors = await contract.methods.getPatientDoctors(address).call();
      setMyDoctors(doctors);
  } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
      return "error";
  }
}

export const getJson = async (ipfsHash,setJSON) => {
  try {
    const response = await fetch(`https://${gateway}/ipfs/${ipfsHash}`);
    if(response.status!==200) {
      return {};
    }
    const data = await response.json();
    setJSON(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
}

export const upload_image = async (pinata,imgFile) => {
  try {
      const response = await pinata.upload.file(imgFile);
      return response.IpfsHash;
  } catch(error) {
      console.error("Error uploading the image:", error);
      return "Error";
  }
}


export const getPatientsData = async (address,contract) => {
  try {
    const patients = await contract.methods.getPatientsData(address).call();
    // console.log(patients);
    return patients;
  } catch (error) {
    console.error('Error:', error);
    return "error";
  }
}

export const Filter = async (data,logo) => {
  const squares = [];
  for(let i=0;i<data.length;i++) {
    const response = await fetch(`https://${gateway}/ipfs/${data[i][0]}`);
    if(response.status!==200) {
      return [];
    }
    const patient = await response.json();
    squares.push({
      name: patient.name,
      treatment: data[i][1],
      profilePic: patient.image?"https://"+gateway+"/ipfs/"+patient.image:logo,
    });
  }
  // console.log(squares);
  return squares;
};

export const assignPatient = async (web3,address,contract,patientId,treatment) => {
  try {

      const txObject = {
        from: address,
        to: contractAddress,
        data: contract.methods.assignPatient(address,patientId,treatment).encodeABI(),     
        gas: 2000000,
      };
      const txHash = await web3.eth.sendTransaction(txObject);
      return true;
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
      return false;
    }
}