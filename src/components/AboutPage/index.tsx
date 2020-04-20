import React from 'react';
import StoryPage from '../StoryPage';
import AboutMeRow from './AboutMeRow';
import AboutWebsiteRow from './AboutWebsiteRow';
import WorkExperienceRow from './WorkExperienceRow';
import PersonalProjectsRow from './PersonalProjectsRow';

const AboutPage: React.FC = () => (
  <div>
    {/* <AboutMeRow />
    <AboutWebsiteRow />
    <PersonalProjectsRow />
    <WorkExperienceRow /> */}
    <StoryPage _storyId="5gklozNFuoxjXPpraPpr" hideCreated hideCommentSection />
  </div>
);

export default AboutPage;
