// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CareSync {

    struct Patient {
        address id;
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
        address id;


        // string name;
        // string speciality;
        // string imgHash;
        // uint contact;
        // string sch;

        string jsonHash;

        // string cvHash;
        // string[] payment;

    }

    mapping (address => Doctor) public doctors;
    mapping (address => Patient) public patients;



    function addPatient(string memory _jsonHash, address _patientId,string[] memory _doctors) public {

        Patient memory newPatient = Patient({
            id: _patientId,
            jsonHash: _jsonHash,
            next_appointment: "",
            doctors: _doctors,
            vitalsHash: ""
        });

        patients[_patientId] = newPatient;
    }

    function setVitals(address _patientID,string memory _vitalHash) public {

        patients[_patientID].vitalsHash = _vitalHash;

    }

    function setnextAppointment(address _patientID, string memory _nextAppointment) public {

        patients[_patientID].next_appointment = _nextAppointment;

    }
        
    function addDoctor(string memory _jsonHash, address _doctorId) public {

        Doctor memory newDoctor = Doctor({
            id: _doctorId,
            jsonHash: _jsonHash
        });
        doctors[_doctorId] = newDoctor;
    }

    function getPatient(address _id) public view returns (string memory){
        return patients[_id].jsonHash;
    }

    function getDoctor(address _id) public view returns (string memory){
        return doctors[_id].jsonHash;
    }


}