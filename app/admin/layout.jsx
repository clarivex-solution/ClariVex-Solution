import { verifyAdminSession } from '@/lib/adminAuth';
import AdminShell from '@/components/admin/AdminShell';
import { Toaster } from 'sonner';

// Force every admin page to be dynamically rendered — no caching ever
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  const { authenticated } = await verifyAdminSession();

  return (
    <>
      <AdminShell authenticated={authenticated}>
        {children}
      </AdminShell>
      <Toaster position="top-right" richColors />
    </>
  );
}
