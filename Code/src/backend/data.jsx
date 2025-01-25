export const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_jsonHash",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_doctorId",
				"type": "address"
			}
		],
		"name": "addDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_jsonHash",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_patientId",
				"type": "address"
			},
			{
				"internalType": "string[]",
				"name": "_doctors",
				"type": "string[]"
			}
		],
		"name": "addPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientID",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_nextAppointment",
				"type": "string"
			}
		],
		"name": "setnextAppointment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientID",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_jsonHash",
				"type": "string"
			}
		],
		"name": "setPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientID",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_vitalHash",
				"type": "string"
			}
		],
		"name": "setVitals",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "doctors",
		"outputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "jsonHash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "getDoctor",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientID",
				"type": "address"
			}
		],
		"name": "getNextAppointment",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "getPatient",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientID",
				"type": "address"
			}
		],
		"name": "getPatientDoctors",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientID",
				"type": "address"
			}
		],
		"name": "getVitals",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "patients",
		"outputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "jsonHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "next_appointment",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "vitalsHash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]