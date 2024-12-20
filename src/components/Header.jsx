import React from 'react'
import user from '../assets/img/user.jpg';
import Navbar from './Navbar';
function Header() {
  return (
    <>
      <div class="content">
        <Navbar />
        <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
          <div className="col-md-12">
            <h2>Dashboard</h2>
          </div>
        </div>
          <div class="row g-4">
            <div class="col-12 col-md-6 col-xl-4">
              <div class="rounded d-flex align-items-center justify-content-between p-5 shadow-sm">
                <h5>Total Chats</h5>

                <h2>234</h2>
                <p>+2% than last month</p>
                {/* <i class="fa fa-chart-line fa-3x"></i>
                <div class="ms-3">
                  <p class="mb-2">Today Sale</p>
                  <h6 class="mb-0">$1234</h6>
                </div> */}
              </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4">
              <div class="rounded d-flex align-items-center justify-content-between p-5 shadow-sm">
                <i class="fa fa-chart-bar fa-3x"></i>
                <div class="ms-3">
                  <p class="mb-2">Total Sale</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-xl-4">
              <div class="rounded d-flex align-items-center justify-content-between p-5 shadow-sm">
                <i class="fa fa-chart-area fa-3x"></i>
                <div class="ms-3">
                  <p class="mb-2">Today Revenue</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid pt-4 px-4">
          <div class="row g-4">
            <div class="col-sm-12 col-xl-6">
              <div class="text-center rounded p-4">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <h6 class="mb-0">Worldwide Sales</h6>
                  <a href="/">Show All</a>
                </div>
                <canvas id="worldwide-sales"></canvas>
              </div>
            </div>
            <div class="col-sm-12 col-xl-6">
              <div class="text-center rounded p-4">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <h6 class="mb-0">Salse & Revenue</h6>
                  <a href="/">Show All</a>
                </div>
                <canvas id="salse-revenue"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid pt-4 px-4">
          <div class="text-center rounded p-4">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h6 class="mb-0">Recent Salse</h6>
              <a href="/">Show All</a>
            </div>
            <div class="table-responsive">
              <table class="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr class="text-white">
                    <th scope="col"><input class="form-check-input" type="checkbox" /></th>
                    <th scope="col">Date</th>
                    <th scope="col">Invoice</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input class="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a class="btn btn-sm btn-primary" href="/">Detail</a></td>
                  </tr>
                  <tr>
                    <td><input class="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a class="btn btn-sm btn-primary" href="/">Detail</a></td>
                  </tr>
                  <tr>
                    <td><input class="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a class="btn btn-sm btn-primary" href="/">Detail</a></td>
                  </tr>
                  <tr>
                    <td><input class="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a class="btn btn-sm btn-primary" href="/">Detail</a></td>
                  </tr>
                  <tr>
                    <td><input class="form-check-input" type="checkbox" /></td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td><a class="btn btn-sm btn-primary" href="/">Detail</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="container-fluid pt-4 px-4">
          <div class="row g-4">
            <div class="col-sm-12 col-md-6 col-xl-4">
              <div class="h-100 rounded p-4">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <h6 class="mb-0">Messages</h6>
                  <a href="/">Show All</a>
                </div>
                <div class="d-flex align-items-center border-bottom py-3">
                  <img class="rounded-circle flex-shrink-0" src={user} alt="" style={{ width: '40px', height: '40px' }} />
                  <div class="w-100 ms-3">
                    <div class="d-flex w-100 justify-content-between">
                      <h6 class="mb-0">Jhon Doe</h6>
                      <small>15 minutes ago</small>
                    </div>
                    <span>Short message goes here...</span>
                  </div>
                </div>
                <div class="d-flex align-items-center border-bottom py-3">
                  <img class="rounded-circle flex-shrink-0" src={user} alt="" style={{ width: '40px', height: '40px' }} />
                  <div class="w-100 ms-3">
                    <div class="d-flex w-100 justify-content-between">
                      <h6 class="mb-0">Jhon Doe</h6>
                      <small>15 minutes ago</small>
                    </div>
                    <span>Short message goes here...</span>
                  </div>
                </div>
                <div class="d-flex align-items-center border-bottom py-3">
                  <img class="rounded-circle flex-shrink-0" src={user} alt="" style={{ width: '40px', height: '40px' }} />
                  <div class="w-100 ms-3">
                    <div class="d-flex w-100 justify-content-between">
                      <h6 class="mb-0">Jhon Doe</h6>
                      <small>15 minutes ago</small>
                    </div>
                    <span>Short message goes here...</span>
                  </div>
                </div>
                <div class="d-flex align-items-center pt-3">
                  <img class="rounded-circle flex-shrink-0" src={user} alt="" style={{ width: '40px', height: '40px' }} />
                  <div class="w-100 ms-3">
                    <div class="d-flex w-100 justify-content-between">
                      <h6 class="mb-0">Jhon Doe</h6>
                      <small>15 minutes ago</small>
                    </div>
                    <span>Short message goes here...</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-xl-4">
              <div class="h-100 rounded p-4">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <h6 class="mb-0">Calender</h6>
                  <a href="/">Show All</a>
                </div>
                <div id="calender"></div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-xl-4">
              <div class="h-100 rounded p-4">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <h6 class="mb-0">To Do List</h6>
                  <a href="/">Show All</a>
                </div>
                <div class="d-flex mb-2">
                  <input class="form-control bg-dark border-0" type="text" placeholder="Enter task" />
                  <button type="button" class="btn btn-primary ms-2">Add</button>
                </div>
                <div class="d-flex align-items-center border-bottom py-2">
                  <input class="form-check-input m-0" type="checkbox" />
                  <div class="w-100 ms-3">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                      <span>Short task goes here...</span>
                      <button class="btn btn-sm"><i class="fa fa-times"></i></button>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center border-bottom py-2">
                  <input class="form-check-input m-0" type="checkbox" />
                  <div class="w-100 ms-3">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                      <span>Short task goes here...</span>
                      <button class="btn btn-sm"><i class="fa fa-times"></i></button>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center border-bottom py-2">
                  <input class="form-check-input m-0" type="checkbox" checked />
                  <div class="w-100 ms-3">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                      <span><del>Short task goes here...</del></span>
                      <button class="btn btn-sm"><i class="fa fa-times"></i></button>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center border-bottom py-2">
                  <input class="form-check-input m-0" type="checkbox" />
                  <div class="w-100 ms-3">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                      <span>Short task goes here...</span>
                      <button class="btn btn-sm"><i class="fa fa-times"></i></button>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center pt-2">
                  <input class="form-check-input m-0" type="checkbox" />
                  <div class="w-100 ms-3">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                      <span>Short task goes here...</span>
                      <button class="btn btn-sm"><i class="fa fa-times"></i></button>
                    </div>
                  </div>
                </div>
              </div>
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
      <a href="/" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
    </>
  )
}

export default Header