import { AuroraBackground } from "@/components/ui/aurora-background";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AuroraBackground>
        <AuthForm />
      </AuroraBackground>
    </div>
  );
}