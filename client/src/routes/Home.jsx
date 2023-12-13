import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { fetchMyRequests } from "../services/requests";
import { Button } from "@/components/ui/button";

export const loader = async () => {
  const { requests } = await fetchMyRequests();
  return { requests };
};

export default function Home() {
  const { requests } = useLoaderData();
  return (
    <div>
      <h1>Welcome to the Main Screen</h1>
      <Link to={`/requests/new`}>Create New Request</Link>
      <h2>Pending Requests</h2>
      <Button>Click me</Button>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.employee}</td>
              <td>{request.startDate}</td>
              <td>{request.endDate}</td>
              <td>Reasons not supported yet</td>
              <td>
                <Link to={`/requests/${request._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Past Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>

            <td>2021-01-01</td>
            <td>2021-01-02</td>
            <td>Family Emergency</td>
            <td>
              <button>Approve</button>
              <button>Deny</button>
            </td>
          </tr>
          <tr>
            <td>Jane Doe</td>

            <td>2021-01-01</td>
            <td>2021-01-02</td>
            <td>Family Emergency</td>
            <td>
              <button>Approve</button>
              <button>Deny</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
