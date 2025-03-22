"use client";

// Other
import { Suspense } from "react";
// React
import React from 'react';
// Component
import { ResetPasswordForm } from "@/components/ui/ResetPasswordForm";

// ================================================================


export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<p>Chargement...</p>}>
            <ResetPasswordForm />
        </Suspense>
    );
}