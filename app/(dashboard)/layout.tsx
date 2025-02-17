import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Analytics } from "@vercel/analytics/react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
  <div>
    <Analytics/><DashboardLayout>{children}</DashboardLayout>
  </div>
  
  );
}