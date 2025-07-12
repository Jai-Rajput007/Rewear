import { AuroraBackground } from "@/components/ui/aurora-background";
import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AuroraBackground>
        <AuthForm mode="register" />
      </AuroraBackground>
    </div>
  );
}