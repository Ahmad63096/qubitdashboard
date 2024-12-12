import React from 'react'
import Calender from '../components/Calender'
function Appointment() {
  return (
    <>
      <div class="container-fluid pt-4 px-4">
        <div class="row vh-100 rounded align-items-center justify-content-center mx-0">
          <div class="col-md-10">
            {/* <h3>This is Appointment</h3> */}
            <Calender/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Appointment