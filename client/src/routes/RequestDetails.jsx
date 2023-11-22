import { useLoaderData } from 'react-router-dom'
import { fetchRequestById } from '../services/requests'

export const loader = async ({ params }) => {
    // get the id from the url params
    const { request } = await fetchRequestById(params.id);
    return { request };
}

export default function RequestDetails() {
    const { request } = useLoaderData();
    return (
        <>
            <h2>Request Details</h2>
            {request ? (
                <div>
                    <p>{request.employee}</p>
                    <p>{request.startDate}</p>
                    <p>{request.endDate}</p>
                </div>
            ) : (
                <div>
                    <p>Request not found</p>
                </div>
            )}
        </>
    )
}
