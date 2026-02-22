import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { API_BASE_URL, getSession } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Analytics = {
  totalUsers: number;
  totalAdmins: number;
  totalStocks: number;
  totalBlogs: number;
  totalEnquiries: number;
  pendingActions: number;
};

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getSession();
    if (!session) return;

    fetch(`${API_BASE_URL}/api/admin/analytics`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.message || "Failed to load analytics");
        }
        return res.json();
      })
      .then((data) => setAnalytics(data.analytics))
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-2xl font-heading font-bold mb-1">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Manage unlisted stocks, blogs, users, enquiries and approvals.
        </p>

        {error && <p className="text-sm text-destructive mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-heading font-bold">
              {analytics?.totalUsers ?? "-"}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Admins</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-heading font-bold">
              {analytics?.totalAdmins ?? "-"}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Unlisted Stocks</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-heading font-bold">
              {analytics?.totalStocks ?? "-"}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Blogs</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-heading font-bold">
              {analytics?.totalBlogs ?? "-"}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Enquiries</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-heading font-bold">
              {analytics?.totalEnquiries ?? "-"}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-heading font-bold">
              {analytics?.pendingActions ?? "-"}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
