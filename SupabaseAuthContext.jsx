
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('Could not fetch user role:', error.message);
        return 'customer';
      }
      return data?.role || 'customer';
    } catch (err) {
      console.error('Error fetching role:', err);
      return 'customer';
    }
  };

  const handleSession = useCallback(async (currentSession) => {
    setSession(currentSession);
    const currentUser = currentSession?.user ?? null;
    setUser(currentUser);
    
    if (currentUser) {
      const role = await fetchUserRole(currentUser.id);
      setUserRole(role);
      // Merge role into user object for convenience
      currentUser.role = role; 
      setUser({ ...currentUser, role }); 
    } else {
      setUserRole(null);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      await handleSession(session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
           setUser(null);
           setSession(null);
           setUserRole(null);
           setLoading(false);
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
           await handleSession(session);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const signUp = useCallback(async (email, password, options) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });
    if (error) toast({ variant: "destructive", title: "Sign up Failed", description: error.message });
    return { error };
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) toast({ variant: "destructive", title: "Sign in Failed", description: error.message });
    return { error };
  }, [toast]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast({ variant: "destructive", title: "Sign out Failed", description: error.message });
    return { error };
  }, [toast]);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    userRole,
    signUp,
    signIn,
    signOut,
    isAdmin: userRole === 'admin'
  }), [user, session, loading, userRole, signUp, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
