// middleware.ts (project root)
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/api/auth/signin", // where to send unauthenticated users
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // protect /dashboard and all its subroutes
};
