import { getAllProducts, getAllClientRequests } from "@/lib/db-operations";

export default async function AdminDashboard() {
  let products: any[] = [];
  let requests: any[] = [];
  let error = null;

  try {
    products = await getAllProducts();
    requests = await getAllClientRequests();
  } catch (err) {
    error = "Failed to load dashboard data";
    console.error(err);
  }

  const newRequests = requests.filter((r) => r.status === "new").length;
  const reviewingRequests = requests.filter((r) => r.status === "reviewing").length;

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <p>Welcome to your De'Hydra admin dashboard</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-label">Total Products</div>
          <div className="stat-value">{products.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Client Requests</div>
          <div className="stat-value">{requests.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">New Requests</div>
          <div className="stat-value" style={{ color: "#f57c00" }}>
            {newRequests}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Under Review</div>
          <div className="stat-value" style={{ color: "#7b1fa2" }}>
            {reviewingRequests}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Recent Client Requests</h2>
        {requests.length === 0 ? (
          <p>No client requests yet.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {requests.slice(0, 10).map((req) => (
                  <tr key={req.id}>
                    <td>{req.companyName}</td>
                    <td>{req.contactName}</td>
                    <td>{req.email}</td>
                    <td>
                      <span className={`status-badge status-${req.status}`}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </td>
                    <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = `
  .section {
    margin-top: 40px;
  }

  .section h2 {
    margin-bottom: 20px;
    font-size: 1.4rem;
    color: #1a1a1a;
  }

  .error-banner {
    background: #ffebee;
    color: #c62828;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
`;
