import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function generateBreadcrumbs(pathname) {
  const paths = pathname.split("/").filter((crumb) => crumb !== "");
  return paths.map((crumb, index) => {
    const to = "/" + paths.slice(0, index + 1).join("/");
    return { crumb, to };
  });
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export default function Breadcrumb() {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  return (
    <nav aria-label="breadcrumb" className="my-4">
      <ol className="flex space-x-2">
        {breadcrumbs.length === 0 ? (
          <li>
            <span className="text-gray-500">Dashboard</span>
          </li>
        ) : (
          <>
            <li>
              <Link
                to={breadcrumbs[0].to}
                className="hover:underline text-gray-700"
              >
                <span className="text-gray-500">
                  {toTitleCase(breadcrumbs[0].crumb)}
                </span>
              </Link>
            </li>
            {breadcrumbs.slice(1).map(({ crumb, to }, index) => (
              <li key={to} className="flex items-center">
                <span className="mx-1">
                  <ChevronRight size={16} />
                </span>
                {index === breadcrumbs.length - 2 ? (
                  <span className="text-gray-500">{toTitleCase(crumb)}</span>
                ) : (
                  <Link to={to} className="hover:underline text-gray-700">
                    {toTitleCase(crumb)}
                  </Link>
                )}
              </li>
            ))}
          </>
        )}
      </ol>
    </nav>
  );
}
