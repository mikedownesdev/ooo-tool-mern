import React from 'react';
import { Link } from "react-router-dom";


export default function Home() {
    return (
        <div>
            <h1>Welcome to the Main Screen</h1>
            <Link to={`/requests/new`}>Create New Request</Link>
            <h2>Pending Requests</h2>
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
