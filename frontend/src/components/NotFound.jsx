import { Link } from "react-router-dom"
export default function NotFound(){
    return(
        <section className="container nf">

            <div className="not-found">
                <h1>404 | Not Found</h1>
                <p><Link to="/">Home Page</Link></p>
            </div>

        </section>
    )
}