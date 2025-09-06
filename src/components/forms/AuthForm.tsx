import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { setSession } from "@/utils/session";

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSuccess: () => void;
  onModeChange: (mode: 'signin' | 'signup') => void;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:11000/api";

export function AuthForm({ mode, onSuccess, onModeChange }: AuthFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    organizationDescription: "",
    organizationContactPhone: "",
    organizationAddress: "",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload =
      mode === "signup"
        ? {
            email: formData.email,
            password: formData.password,
            name: `${formData.firstName} ${formData.lastName}`,
            organization: {
              name: formData.organizationName,
              description: formData.organizationDescription,
              contactPhone: formData.organizationContactPhone,
              address: formData.organizationAddress,
            },
          }
        : {
            email: formData.email,
            password: formData.password,
          };

    try {
      const res = await fetch(`${API_URL}/auth/${mode === "signup" ? "signup" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Authentication failed");
        return;
      }

      if (data.token && data.user) {
        setSession(data.token, data.user);
      }

      onSuccess();
    } catch (err) {
      alert("Network error");
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate password reset
    setShowForgotPassword(false);
  };

  if (showForgotPassword) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
            
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          <span className="text-xl font-bold text-foreground">SynergySphere</span>
        </div>
        <CardTitle>{mode === 'signin' ? 'Sign In' : 'Create Account'}</CardTitle>
        <CardDescription>
          {mode === 'signin' 
            ? 'Welcome back! Please sign in to your account.' 
            : 'Join SynergySphere and start collaborating with your team.'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <div className="max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    type="text"
                    placeholder="Enter your organization name"
                    value={formData.organizationName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        organizationName: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizationDescription">Organization Description</Label>
                  <Input
                    id="organizationDescription"
                    type="text"
                    placeholder="Describe your organization (optional)"
                    value={formData.organizationDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        organizationDescription: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizationContactPhone">Contact Phone</Label>
                  <Input
                    id="organizationContactPhone"
                    type="text"
                    placeholder="Contact phone (optional)"
                    value={formData.organizationContactPhone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        organizationContactPhone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizationAddress">Organization Address</Label>
                  <Input
                    id="organizationAddress"
                    type="text"
                    placeholder="Address (optional)"
                    value={formData.organizationAddress}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        organizationAddress: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
            )}
            
            {mode === 'signin' && (
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="link" 
                  className="text-sm p-0 h-auto"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot password?
                </Button>
              </div>
            )}
            
            <Button type="submit" className="w-full">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        </div>
        <div className="mt-6">
          <Separator />
          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground">
              {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            </span>
            <Button 
              type="button" 
              variant="link" 
              className="text-sm p-0 h-auto"
              onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}