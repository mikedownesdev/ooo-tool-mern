import { Outlet, Link, useLoaderData } from "react-router-dom";
import { getSomeData } from "../services/getSomeData"

export async function loader() {
    const someData = await getSomeData()
    return { someData };
}

export default function Root() {
    const { someData } = useLoaderData();
    return (
        <>
            <div id="sidebar">
                <h1>Time Off Request App</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <form method="post">
                        <button type="submit">New</button>
                    </form>
                </div>
                <div>
                    <h2>Some Data</h2>
                    {someData.length ? (
                        <ul>
                            {someData.map((data) => (
                                <li key={data.id}>
                                    <Link to={`/some-data/${data.id}`}>
                                        {data.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No data found</p>
                    )}
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/`}>Home</Link>
                        </li>
                        <li>
                            <Link to={`/requests/new`}>New Request</Link>
                        </li>
                        <li>
                            <a href={`/settings`}>Settings</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}
