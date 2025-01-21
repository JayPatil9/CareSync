import React from "react";

export const Content = ({ patientUpdate, nextAppointment, doctors }) => {
  return (
    <div className="contentcontainer">
      <div className="left-div">
        <div className="title">
          <h3>Quick Updates</h3>
        </div>
        <div className="info">
          <p>
            <strong>Date:</strong> {patientUpdate.patientInfo.date}
          </p>
          <p>
            <strong>Time:</strong> {patientUpdate.patientInfo.time}
          </p>
          <h3>Vitals:</h3>
          <p>
            <strong>Blood Pressure:</strong>{" "}
            {patientUpdate.vitals.bloodPressure.systolic}/
            {patientUpdate.vitals.bloodPressure.diastolic}{" "}
            {patientUpdate.vitals.bloodPressure.unit}
          </p>
          <p>
            <strong>Heart Rate:</strong> {patientUpdate.vitals.heartRate.value}{" "}
            {patientUpdate.vitals.heartRate.unit}
          </p>
          <p>
            <strong>Oxygen Saturation:</strong>{" "}
            {patientUpdate.vitals.oxygenSaturation.value}{" "}
            {patientUpdate.vitals.oxygenSaturation.unit}
          </p>
        </div>
      </div>

      <div className="right-divs">
        <div className="top-right">
          <div className="title">
            <h3>SSchedule</h3>
            <p>
              <strong>Date:</strong> {nextAppointment.date}
            </p>
            <p>
              <strong>Day:</strong> {nextAppointment.day}
            </p>
            <p>
              <strong>Time:</strong> {nextAppointment.time}
            </p>
          </div>
        </div>
        <div className="bottom-right">
          <div className="title">
            <h3>Doctors</h3>
            {doctors.map((doctor, index) => (
              <p key={index}>
                <strong>{doctor}</strong>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
