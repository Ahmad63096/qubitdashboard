import React from 'react'
import Navbar from '../components/Navbar'

function Dashboard() {
  return (
    <>
      <div class="content">
        <Navbar />
        <div class="container-fluid pt-4 px-4">
          <div class="row vh-100 rounded align-items-center justify-content-center mx-0">
            <div class="col-md-6 text-center">
              <h3>This is Dashboard</h3>
            </div>
          </div>
        </div>
        <div class="container-fluid pt-4 px-4 ">
          <div class="rounded-top p-4">
            <div class="row">
              <div class="col-12 col-sm-6 text-center text-sm-start">
                &copy; All Right Reserved.
              </div>
              <div class="col-12 col-sm-6 text-center text-sm-end">
                Designed By HTML Codex
                <br />Distributed By: Theme
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard