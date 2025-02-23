import { Link } from "@inertiajs/react";

export default function Pagination({ links}) {
    return (
        <nav aria-label="Page navigation example" className="text-center mt-4 d-flex gap-2 justify-content-center">
            <ul className="pagination">
                {links.map((link, index) => (
                    <li
                        key={index}
                        className={
                            `page-item ${link.active ? "active" : ""}` +
                            `${link.url === null ? " disabled" : ""} `
                        }
                    >
                        <Link
                            // preserveState={true}
                            // preserveScroll={true}
                            href={link.url}
                            className="page-link"
                            dangerouslySetInnerHTML={{
                                __html: link.label.includes("Previous")
                                    ? "&lsaquo;"
                                    : link.label.includes("Next")
                                        ? "&rsaquo;"
                                        : link.label,
                            }}
                        ></Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}