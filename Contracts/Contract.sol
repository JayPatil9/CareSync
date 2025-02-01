// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CareSync {

    struct Patient {
        uint id;
        address paddr;
        // string name;
        // string gender;
        // uint age;
        // uint dob;
        // string imgHash;
        // uint height;
        // uint weight;
        // uint contact;
        // uint emergency_contact;

        string jsonHash;

        string next_appointment;
        string[] doctors;
        string vitalsHash;
        // string[] prescriptions;
        // string[] billsHash;
        // string[] reportsHash;
    }

    

    struct Doctor {
        uint id;
        address daddr; 

        string name;
        // string speciality;
        // string imgHash;
        // uint contact;
        // string sch;

        string jsonHash;
        uint[] patientsId;
        string[] treatmentArr;
        address[] patientsAddr;

        // string cvHash;
        // string[] payment;

    }

     

    mapping (address => Doctor) public doctors;
    mapping (address => Patient) public patients;

    uint public numPatient;
    uint public numDoctors;

    Patient[] public patientsArr;
    Doctor[] public doctorsArr;

    constructor() {
         numPatient = 0;
         numDoctors = 0;
     }


    function addPatient(string memory _jsonHash, address _patientId) public {

        Patient memory newPatient = Patient({
            id: numPatient,
            paddr: _patientId,
            jsonHash: _jsonHash,
            next_appointment: "",
            doctors: new string[](0),
            vitalsHash: ""
        });
        patients[_patientId] = newPatient;
        patientsArr.push(newPatient);
        numPatient++;
    }

    function setPatient(address _patientID, string memory _jsonHash) public {
        patients[_patientID].jsonHash = _jsonHash;
    }

    function getPatient(address _id) public view returns (string memory){
        return patients[_id].jsonHash;
    }

    function setVitals(address _patientID,string memory _vitalHash) public {
        patients[_patientID].vitalsHash = _vitalHash;
    }

    function getVitals(address _patientID) public view returns (string memory) {
        return patients[_patientID].vitalsHash;
    }

    function setnextAppointment(address _patientID, string memory _nextAppointment) public {
        patients[_patientID].next_appointment = _nextAppointment;
    }

    function getNextAppointment(address _patientID) public view returns (string memory ){
        return patients[_patientID].next_appointment;
    }

    function getPatientDoctors(address _patientID) public view returns (string[] memory ) {
        return patients[_patientID].doctors;
    }
        
    function addDoctor(string memory _jsonHash, address _doctorId,string memory _name) public {

        Doctor memory newDoctor = Doctor({
            name: _name,
            id: numDoctors,
            daddr: _doctorId,
            jsonHash: _jsonHash,
            patientsId: new uint[](0),
            treatmentArr: new string[](0),
            patientsAddr: new address[](0)
        });
        doctors[_doctorId] = newDoctor;
        doctorsArr.push(newDoctor);
        numDoctors++;
    }

    function getDoctor(address _id) public view returns (string memory){
        return doctors[_id].jsonHash;
    }

    function assignPatient(address _docId,uint _patientID,string memory _treartment) public {
        doctors[_docId].patientsId.push(_patientID);
        doctors[_docId].treatmentArr.push(_treartment);
        doctors[_docId].patientsAddr.push((patientsArr[_patientID]).paddr);
        patients[patientsArr[_patientID].paddr].doctors.push(doctors[_docId].name);
    }

    function getPatientsData(address _docId) public view returns (string[][] memory) {
        uint[] memory arr = doctors[_docId].patientsId;
        string[] memory brr = doctors[_docId].treatmentArr;
        string[][] memory qrr=new string[][](arr.length);
        for (uint i=0;i<arr.length;i++) {
            string[] memory temp=new string[](3);
            temp[0] = patientsArr[arr[i]].jsonHash;
            temp[1] = brr[i];
            qrr[i] = temp;
        }
        return qrr;
    }

    function getPatientAddrById(uint _id) public view returns (address) {
        return patientsArr[_id].paddr;
    }


}