import React from "react";

export const Content = ({ patientUpdate, nextAppointment, doctors }) => {
  return (
    <div className="pd--contentcontainer">
      <div className="pd--left-div">
        <div className="pd--title">
          <h3 className="pd--h3">Quick Updates</h3>
        </div>
        <div className="info">
          <p className="pd--p1">
            <strong>Date:</strong> {patientUpdate.patientInfo.date}
          </p>
          <p className="pd--p1">
            <strong>Time:</strong> {patientUpdate.patientInfo.time}
          </p>
          <h3 className="pd--h3">Vitals:</h3>
          <p className="pd--p1">
            <strong>Blood Pressure:</strong>{" "}
            {patientUpdate.vitals.bloodPressure.systolic}/
            {patientUpdate.vitals.bloodPressure.diastolic}{" "}
            {patientUpdate.vitals.bloodPressure.unit}
          </p>
          <p className="pd--p1">
            <strong>Heart Rate:</strong> {patientUpdate.vitals.heartRate.value}{" "}
            {patientUpdate.vitals.heartRate.unit}
          </p>
          <p className="pd--p1">
            <strong>Oxygen Saturation:</strong>{" "}
            {patientUpdate.vitals.oxygenSaturation.value}{" "}
            {patientUpdate.vitals.oxygenSaturation.unit}
          </p>
        </div>
      </div>

      <div className="pd--right-divs">
        <div className="pd--top-right">
          <div className="pd--title">
            <h3>Appointments</h3>
            <p className="pd--p1">
              <strong>Date:</strong> {nextAppointment.date}
            </p>
            <p className="pd--p1">
              <strong>Day:</strong> {nextAppointment.day}
            </p>
            <p className="pd--p1">
              <strong>Time:</strong> {nextAppointment.time}
            </p>
          </div>
        </div>
        <div className="pd--bottom-right">
          <div className="pd--title">
            <h3 className="pd--h3">Doctors</h3>
            {doctors.map((doctor, index) => (
              <p className="pd--p1" key={index}>
                <strong>{doctor}</strong>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
