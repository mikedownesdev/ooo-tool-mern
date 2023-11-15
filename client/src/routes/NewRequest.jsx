import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import { createRequest } from '../services/createRequest';

export async function action() {
    const request = await createRequest()
    return { request };
}

export default function NewRequest() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Here you would usually make an API call to the backend to save the request
    //     console.log('Out of Office Request:', { startDate, endDate, reason });
    //     // Reset the form fields
    //     setStartDate('');
    //     setEndDate('');
    //     setReason('');
    // };

    return (
        <div className="out-of-office-request">
            <h2>New Out of Office Request</h2>
            <Form method='post'>
                <div className="form-group">
                    <label htmlFor="start-date">Start Date</label>
                    <input
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="end-date">End Date</label>
                    <input
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reason">Reason</label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Request</button>
            </Form>
        </div>
    );
}
