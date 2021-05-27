import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProfilePage from '../pages/ProfilePage/profilePage';
import PrivateRoute, {
	CustomRoute,
} from '../components/PrivateRoute/privateRoute';
import ContactUs from '../pages/About/ContactUs/contactUs';
import Director from '../pages/About/Director/director';
import ExecTeam from '../pages/About/ExecutiveTeam/execTeam';
import SignIn from '../pages/Auth/SignIn/signin';
import SignUp from '../pages/Auth/SignUp/emailVerification/signup';
import SignUpCreate from '../pages/Auth/SignUp/signupCreate/signupCreate';
import SignUpDetails from '../pages/Auth/SignUp/signupDetails/signupDetails';
import HomePage from '../pages/HomePage/homePage';
import BeAMentor from '../pages/Support/beAMentor/beAMentor';
import BeAVolunteer from '../pages/Support/beAVolunteer/beAVolunteer';
import Contribute from '../pages/Support/Contribute/contribute';
import JobPortal from '../pages/JobPortal/JobPortal';
import Members from '../pages/Members/members';
import Institute from '../pages/Members/institute';
import Location from '../pages/Members/location';
import ProfessionalSkills from '../pages/Members/prof_skills';
import Company from '../pages/Members/company';
import Roles from '../pages/Members/roles';
import Industry from '../pages/Members/industry';
import EventsSection from '../pages/Events/events';
import EventEdit from '../components/EventsEdit/eventsEdit.component';
import EventDesc from '../components/EventsDesc/eventsDesc.component';
import NewsRoom from '../pages/Newsroom/newsroom';
import { NewsItemIndiv } from '../components/NewsItem/newsItem.component';
import NewsItemEdit from '../components/newsItemEdit/newsItemEdit.component';
import Admindashboard from '../pages/Admin Dashboard/Admindashboard';
import PendingEvents from '../pages/Admin Dashboard/PendingEvents';
import PostInternship from '../pages/Support/PostJob/PostInternship';
import JobSection from '../pages/JobPortal/jobs';
import PendingNews from '../pages/Admin Dashboard/PendingNews';

interface RoutesProp {}
export const Routes: React.FC<RoutesProp> = () => {
	return (
		<Switch>
			<React.Fragment>
				{/* Auth routes */}
				<PrivateRoute exact path="/auth/signin" auth={true}>
					<SignIn />
				</PrivateRoute>
				<PrivateRoute exact path="/auth/signup" auth={true}>
					<SignUp />
				</PrivateRoute>
				<PrivateRoute exact path="/auth/signup/create" auth={true}>
					<SignUpCreate />
				</PrivateRoute>
				<PrivateRoute
					exact
					path="/auth/signup/create/batch"
					auth={true}
				>
					<SignUpDetails />
				</PrivateRoute>

				{/* Private Routes*/}
				<PrivateRoute path="/dashboard" exact>
					<Dashboard />
				</PrivateRoute>
				<PrivateRoute path="/profile" exact>
					<ProfilePage />
				</PrivateRoute>
				<PrivateRoute path="/support/become-mentor" exact>
					<BeAMentor />
				</PrivateRoute>
				<PrivateRoute path="/support/become-volunteer" exact>
					<BeAVolunteer />
				</PrivateRoute>

				{/* profile routes */}
				{/* <PrivateRoute path="/profile/basic" exact>
						<ProfilePage />
					</PrivateRoute>
					<PrivateRoute path="/profile/contact" exact>
						<ProfilePage />
					</PrivateRoute>
					<PrivateRoute path="/profile/contact" exact>
						<ProfilePage />
					</PrivateRoute> */}
				{/* <Route path="/admin_dashboard" exact>
						<Admindashboard />
					</Route> */}
				{/* <Route path="/admin_dashboard/pending_events" exact>
						<PendingEvents />
					</Route> */}

				{/* newsroom */}
				<PrivateRoute path="/newsroom" exact>
					<NewsRoom />
				</PrivateRoute>
				<PrivateRoute path="/newsroom/create/" exact>
					<NewsItemEdit />
				</PrivateRoute>
				<PrivateRoute path="/newsroom/n/:id" exact>
					<NewsItemIndiv />
				</PrivateRoute>
				<PrivateRoute path="/newsroom/:id/edit">
					<NewsItemEdit />
				</PrivateRoute>

				<PrivateRoute path="/job_portal">
					<JobPortal />
				</PrivateRoute>
				<PrivateRoute path="/all_jobs" exact>
					<JobSection />
				</PrivateRoute>

				{/* public routes */}
				<CustomRoute path="/about/contact">
					<ContactUs />
				</CustomRoute>
				<CustomRoute path="/about/executive-committee">
					<ExecTeam />
				</CustomRoute>
				<CustomRoute path="/support/contribute">
					<Contribute />
				</CustomRoute>
				<CustomRoute path="/about/director">
					<Director />
				</CustomRoute>

				<PrivateRoute path="/user/me">
					<ProfilePage />
				</PrivateRoute>

				{/* landing Page */}
				<CustomRoute path="/" exact>
					<HomePage />
				</CustomRoute>

				{/* Members' routes */}
				<PrivateRoute path="/members" exact>
					<Members />
				</PrivateRoute>
				<PrivateRoute path="/members/institute" exact>
					<Institute />
				</PrivateRoute>
				<PrivateRoute path="/members/location" exact>
					<Location />
				</PrivateRoute>
				<PrivateRoute path="/members/prof_skills" exact>
					<ProfessionalSkills />
				</PrivateRoute>
				<PrivateRoute path="/members/company" exact>
					<Company />
				</PrivateRoute>
				<PrivateRoute path="/members/roles" exact>
					<Roles />
				</PrivateRoute>
				<PrivateRoute path="/members/industry" exact>
					<Industry />
				</PrivateRoute>

				{/* events' routes */}
				<PrivateRoute path="/events" exact>
					<EventsSection />
				</PrivateRoute>
				<PrivateRoute path="/events/create" exact>
					<EventEdit />
				</PrivateRoute>
				<PrivateRoute path="/events/e/:id">
					<EventDesc />
				</PrivateRoute>
				<PrivateRoute path="/events/:id/edit" exact>
					<EventEdit />
				</PrivateRoute>

				{/* admin dashboard */}
				<PrivateRoute path="/admin_dashboard" exact>
					<Admindashboard />
				</PrivateRoute>
				<PrivateRoute path="/admin_dashboard/pending_events" exact>
					<PendingEvents />
				</PrivateRoute>
				<PrivateRoute path="/admin_dashboard/pending_news">
					<PendingNews />
				</PrivateRoute>

				<PrivateRoute path="/post_job" exact>
					<PostInternship />
				</PrivateRoute>

				{/* <Route path="*">
						<Redirect to="/" />
					</Route> */}
			</React.Fragment>
		</Switch>
	);
};
