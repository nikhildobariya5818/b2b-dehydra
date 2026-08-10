import Link from "next/link";
import { getAllClientRequests } from "@/lib/db-operations";

export default async function ClientRequestsPage() {
  let requests: any[] = [];
  let error = null;

  try {
    requests = await getAllClientRequests();
  } catch (err) {
    error = "Failed to load client requests";
    console.error(err);
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Client Requests</h1>
        <p>Manage inquiries and quotes from potential clients</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {requests.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", background: "white", borderRadius: "8px" }}>
          <p>No client requests yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Industry</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td><strong>{req.companyName}</strong></td>
                  <td>{req.contactName}</td>
                  <td>
                    <a href={`mailto:${req.email}`} style={{ color: "#00a8cc" }}>
                      {req.email}
                    </a>
                  </td>
                  <td>{req.industry}</td>
                  <td>
                    <span className={`status-badge status-${req.status}`}>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </td>
                  <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <Link href={`/admin/requests/${req.id}`} className="btn btn-secondary">
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
