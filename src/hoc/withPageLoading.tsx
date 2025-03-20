import LoadingPage from "../components/LoadingPage";
import React from "react";

const withPageLoading = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WithPageLoading = (props: any) => {
    return (
      <>
        <LoadingPage />
        <WrappedComponent {...props} />
      </>
    );
  };

  WithPageLoading.displayName = `withPageLoading(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithPageLoading;
};

export default withPageLoading; 