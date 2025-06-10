import { useAuth } from "../Context/AuthContext";
import { loadPageByRole } from "../api/enums/Role";

export default function InitialPageRedirect() {
    const { user } = useAuth();
    const Page = loadPageByRole(user?.role);
    return <Page />;
}