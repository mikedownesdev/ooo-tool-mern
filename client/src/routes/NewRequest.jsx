import { Form, redirect } from 'react-router-dom';
import { createTimeOffRequest } from '../services/requests';

// TODO create functions to handle validate the form data upon user input

export async function action({ request }) {

    // TODO validate the form data upon
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const responseData = await createTimeOffRequest(data);
    const timeOffRequestId = responseData.request._id;
    return redirect(`/requests/${timeOffRequestId}`);

}

export default function NewRequest() {
    return (
        <div className="out-of-office-request">
            <h2>New Out of Office Request</h2>
            <Form method='post'>
                <div className="form-group">
                    <label htmlFor="start-date">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="end-date">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reason">Reason</label>
                    <textarea
                        id="reason"
                        name="reason"
                        required
                    />
                </div>
                <button type="submit">Submit Request</button>
            </Form>
        </div>
    );
}
