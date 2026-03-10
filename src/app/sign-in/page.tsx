import Navwrapper from "@/components/Navwrapper/NavFooter";
import SignIn from "@/components/signincomponent/signin";
import PublicRoute from "@/components/publicRoute";

export default function SignInPage() {
  return (
    <PublicRoute>
      <Navwrapper>
        <SignIn />
      </Navwrapper>
    </PublicRoute>
  );
}
