import { ActionFunction, LazyRouteFunction, LoaderFunction, ShouldRevalidateFunction } from "react-router-dom";

export interface RouteObject {
    path?: string;
    index?: boolean;
    children?: RouteObject[];
    caseSensitive?: boolean;
    id?: string;
    loader?: LoaderFunction;
    action?: ActionFunction;
    element?: React.ReactNode | null;
    hydrateFallbackElement?: React.ReactNode | null;
    errorElement?: React.ReactNode | null;
    Component?: React.ComponentType | null;
    HydrateFallback?: React.ComponentType | null;
    ErrorBoundary?: React.ComponentType | null;
    // handle?: RouteObject["handle"];
    shouldRevalidate?: ShouldRevalidateFunction;
    lazy?: LazyRouteFunction<any>;
  }