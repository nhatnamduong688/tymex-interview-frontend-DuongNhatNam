import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout, AuthLayout } from '../layouts';
import { HomePage } from '../components/HomePage';
import { BannerSection } from '../components/BannerSection';
import { lazy } from 'react';
import withPageLoading from '../hoc/withPageLoading';

// Lazy load pages
const AboutUsPage = lazy(() => import('../pages/AboutUsPage'));
const OurTeamsPage = lazy(() => import('../pages/OurTeamsPage'));
const MarketplacePage = lazy(() => import('../pages/MarketplacePage'));
const RoadmapPage = lazy(() => import('../pages/RoadmapPage'));
const WhitepaperPage = lazy(() => import('../pages/WhitepaperPage'));

// Apply HOC
const AboutUsPageWithLoading = withPageLoading(AboutUsPage);
const OurTeamsPageWithLoading = withPageLoading(OurTeamsPage);
const MarketplacePageWithLoading = withPageLoading(MarketplacePage);
const RoadmapPageWithLoading = withPageLoading(RoadmapPage);
const WhitepaperPageWithLoading = withPageLoading(WhitepaperPage);

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <BannerSection />
            <HomePage />
          </>
        )
      },
      {
        path: 'about-us',
        element: <AboutUsPageWithLoading />
      },
      {
        path: 'our-teams',
        element: <OurTeamsPageWithLoading />
      },
      {
        path: 'marketplace',
        element: <MarketplacePageWithLoading />
      },
      {
        path: 'roadmap',
        element: <RoadmapPageWithLoading />
      },
      {
        path: 'whitepaper',
        element: <WhitepaperPageWithLoading />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <div>Login Page</div>
      },
      {
        path: 'register',
        element: <div>Register Page</div>
      }
    ]
  }
]); 