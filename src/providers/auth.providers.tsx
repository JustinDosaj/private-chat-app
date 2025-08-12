"use client"

import { createContext, useEffect, useState, ReactNode, useRef, useCallback } from "react";
import { configureAmplify } from "@/config/amplify.config";
import { fetchAuthSession, fetchUserAttributes, signOut, signIn, signInWithRedirect } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";
import { IAuthContext } from "../types/auth";
import { IUser } from "../types/user"

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

// TODO: Use fetchAuthSession to get tokenId.toString() to authorize HTTP requests
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<IUser | null>(null);
    const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
    const logout = async () => {
        try {

            await signOut();
            setIsAuthenticated(false);
            setUser(null);
            router.push('/')

        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await signIn({ username: email, password });
            await checkAuth(); // Refresh auth state
            router.replace('/')

        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        await signInWithRedirect({ provider: "Google" })
    };

    const checkAuth = async () => {
        try {
            const session = await fetchAuthSession();
            const idToken = session.tokens?.idToken?.toString() || null;
            console.log(session.tokens?.accessToken?.toString())
            const authenticated = !!idToken;

            let userData: IUser | null = null;
            if (authenticated) {
                const attributes = await fetchUserAttributes();
                userData = {
                    email: attributes.email || null,
                    sub: attributes.sub || null,
                    idToken: idToken
                };
            }

            setIsAuthenticated(authenticated);
            setUser(userData);
        } catch (error) {
            console.error("Auth error:", error);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshUserToken = useCallback(async () => {
        if (!isAuthenticated) return;
        
        try {
            const session = await fetchAuthSession({ forceRefresh: true });
            const idToken = session.tokens?.idToken?.toString();
            
            if (idToken && user) {
                setUser({
                    ...user,
                    idToken: idToken
                });
                console.log("Token refreshed successfully");
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        configureAmplify();
        checkAuth();

        return () => {
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
            }
        };
    }, []);

    // Set up token refresh when user becomes authenticated
    useEffect(() => {
        if (isAuthenticated) {
            // Refresh token every 45 minutes
            refreshIntervalRef.current = setInterval(refreshUserToken, 45 * 60 * 1000);
        } else {
            // Clear interval if not authenticated
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
                refreshIntervalRef.current = null;
            }
        }
    }, [isAuthenticated, refreshUserToken]);

    return (
        <AuthContext.Provider value={{isAuthenticated, isLoading, user, login, logout, loginWithGoogle, refreshUserToken}}>
            {children}
        </AuthContext.Provider>
    )
};
