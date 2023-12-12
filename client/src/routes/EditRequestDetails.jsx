import { fetchRequestById, modifyRequest } from "../services/requests";
import { Form, useLoaderData, useParams, redirect } from "react-router-dom";

export const loader = async ({ params }) => {
  // get the id from the url params
  const { request } = await fetchRequestById(params.id);
  return { request };
};

// The term request here represents the HTTP request, not the time off request
export const action = async ({ request, params }) => {
  const timeOffRequestId = params.id;

  // TODO validate the form data upon
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const responseData = await modifyRequest(timeOffRequestId, updates);
  return redirect(`/requests/${timeOffRequestId}`);
};

export default function EditRequestDetails() {
  const { request } = useLoaderData();
  return (
    <>
      <h2>Edit Details Below</h2>
      {request ? (
        <Form method="put">
          <div className="form-group">
            <label htmlFor="start-date">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              defaultValue={
                new Date(request.startDate).toISOString().split("T")[0]
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-date">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              defaultValue={
                new Date(request.endDate).toISOString().split("T")[0]
              }
              required
            />
          </div>
          <button type="submit">Update Request</button>
        </Form>
      ) : (
        <div>
          <p>Request not found</p>
        </div>
      )}
    </>
  );
}
