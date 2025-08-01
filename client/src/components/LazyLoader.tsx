import { Suspense, ComponentType, lazy } from 'react';

interface LazyLoaderProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

// Generic lazy loading wrapper component
export function LazyLoader({ fallback = <LoadingSpinner />, children }: LazyLoaderProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

// Default loading spinner
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin w-8 h-8 border-4 border-african-orange-500 border-t-transparent rounded-full" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

// HOC for creating lazy components
export function withLazyLoading<P = {}>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFn);
  
  return function WrappedComponent(props: P) {
    return (
      <LazyLoader fallback={fallback}>
        <LazyComponent {...(props as any)} />
      </LazyLoader>
    );
  };
}

// Specialized loaders for different content types
export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin w-12 h-12 border-4 border-african-orange-500 border-t-transparent rounded-full" />
        <p className="text-lg text-gray-700">Loading page...</p>
      </div>
    </div>
  );
}

export function CardLoader() {
  return (
    <div className="educafric-card animate-pulse">
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

export function TableLoader() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-10 w-10"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Lazy loaded page components
// LazyDashboard removed - now using RoleBasedDashboard directly
export const LazyStudents = withLazyLoading(() => import('../pages/Students'), <PageLoader />);
export const LazyTeachers = withLazyLoading(() => import('../pages/Teachers'), <PageLoader />);
export const LazyGrades = withLazyLoading(() => import('../pages/Grades'), <PageLoader />);
export const LazyAttendance = withLazyLoading(() => import('../pages/Attendance'), <PageLoader />);
export const LazyProfile = withLazyLoading(() => import('../pages/Profile'), <PageLoader />);