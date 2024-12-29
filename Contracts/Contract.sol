// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CareSync {

    struct Prescription {
        bool expired;
        string imgHash;
    }

    struct Patient {
        address id;
        string name;
        string imgHash;
        uint height;
        uint weight;
        uint next_appointment;
        uint contact;
        uint emergency_contact;
        Prescription[] prescriptions;
        string[] billsHash;
        string[] reportsHash;
    }

    struct Doctor {
        address id;
        string name;
        string speciality;
        string imgHash;
        uint contact;
        uint emergency_contact;

    }

    uint numPatient;
    uint numDoctors;

    mapping (address => Doctor) public doctors;
    mapping (address => Patient) public patients;

    constructor() {
        numDoctors = 0;
        numPatient = 0;
    }

}