"use client";
import React, { useState } from "react";

import { SignInPage as AdminSignInPage, Testimonial } from "@/components/form/SignIn";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";



const SignInPage = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());


    try {
      const { error } = await authClient.signIn.email({
        email: data.email as string,
        password: data.password as string,
      });

      if (error) {
        setError(error.message || 'Erreur de connexion');
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      router.push("/admin/dashboard");
    } catch (error) {
      setError('Une erreur est survenue');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Continue with Google clicked");
    alert("Continue with Google clicked");
  };

  const handleResetPassword = () => {
    alert("Reset Password clicked");
  }

  const handleCreateAccount = () => {
    alert("Create Account clicked");
  }

  return (
    <div className="bg-background text-foreground">
      <AdminSignInPage
        heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
        onSignIn={handleSignIn}
      />
    </div>
  );
};



export default SignInPage;
