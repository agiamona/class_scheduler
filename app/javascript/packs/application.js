import React from 'react';
import Joi from 'joi-browser';
import ReactJoiValidation from 'react-joi-validation';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

/* localization */

import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import ReactDom from 'react-dom';

import MuiTheme from '../components/MuiTheme';

import Homepage from '../components/Homepage';
import SearchBar from '../components/SearchBar';

import ConversationIndexPage from '../components/ConversationIndexPage';
import NewMessagePage from '../components/NewMessagePage';
import MyProfile from '../components/MyProfile';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import NewPasswordPage from '../components/NewPasswordPage';
import ResetPasswordPage from '../components/ResetPasswordPage';
import NotFoundPage from '../components/NotFoundPage';

import TermsAndConditions from '../components/TermsAndConditions';
import NewAvailability from '../components/NewAvailability';
import AvailabilityIndexPage from '../components/AvailabilityIndexPage';
import UserProfile from '../components/UserProfile';
import SearchResults from '../components/SearchResults';
import AboutPage from '../components/AboutPage';
import ConversationPage from '../components/ConversationPage';
import UserReviewIndexPage from '../components/UserReviewIndexPage';

import ChooseLanguage from '../components/utils/ChooseLanguage';

import './application.css';

import localeData from '../../../build/locales/data.json';

import { ENGLISH, SPANISH } from '../components/utils/availableLocales';

addLocaleData([ ...en, ...es ]);
const language = ChooseLanguage();
const messages = localeData[language];

const { render }  = ReactDom;

ReactJoiValidation.setJoi(Joi);

function renderUserProfile(data, props) {
  const isUserSame = function(){
    if (data && data.currentUser && data && data.user && data.user) {
      return data.user.url_slug === data.currentUser.url_slug;
    }
  }();

  if (isUserSame) {
    return <Redirect to='/' />;
  } else {
    return <UserProfile { ...data } { ...props } />;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('main');
  const node = document.getElementById('data');

  const data = node? JSON.parse(node.getAttribute('data')): {};
  const locale = `(${ENGLISH}|${SPANISH})`;

  render(
    <IntlProvider locale={ language } messages={ messages }>
      <MuiThemeProvider muiTheme={ getMuiTheme(MuiTheme) }>
        <Router >
          <Switch>

            <Route exact path={ `/${locale}` } render={ () => <Homepage { ...data } /> } />

            <Route exact path={ `/${locale}/inbox` } render={ (props) => <ConversationIndexPage { ...data } { ...props } /> } />
            <Route exact path={ `/${locale}/inbox/:id` } render={ (props) => <ConversationPage { ...data } { ...props } /> } />
            <Route exact path={ `/${locale}/messages/new` } render={ (props) => <NewMessagePage { ...data } { ...props } /> } />
            <Route exact path={ `/${locale}/search` } render={ (props) => <SearchBar { ...data } { ...props } /> } />
            <Route exact path={ `/${locale}/volunteers` } render={ (props) => <SearchResults { ...data } { ...props } /> } />
            <Route exact path={ `/${locale}/my_profile` } render={ (props) => <MyProfile { ...data } { ...props } /> } />
            <Route exact path={ `/${locale}/:user_id/(:order)` } render={ (props) => <UserReviewIndexPage { ...data } { ...props } /> } />
            <Route exact path={ `/${locale}/reviews/author/:url_slug` } render={ (props) => <UserReviewIndexPage { ...data } { ...props } /> } />

            <Route
              exact
              path={ `/${locale}/profiles/:url_slug` }
              render={ (props) => (renderUserProfile (data, props)) }
            />
            <Route exact path={ `/${locale}/password/new` } component={ NewPasswordPage } />
            <Route exact path={ `/${locale}/password/edit` } render={ (props) => <ResetPasswordPage { ...props } /> } />
            <Route exact path={ `/${locale}/availabilities/new` } render={ (props) => <NewAvailability { ...data } { ...props } /> } />
            <Route exact path={ `/${locale}/availabilities` } render={ (props) => <AvailabilityIndexPage { ...data }  { ...props } /> } />

            <Route exact path={ `/${locale}/about` } render={ (props) => <AboutPage { ...data } { ...props } /> } />
            <Route exact path={ `/${locale}/sign_in` } component={ SignIn } />
            <Route exact path={ `/${locale}/sign_up/:role` } render={ (props) => <SignUp { ...data }  { ...props } /> } />
            <Route exact path={ `/${locale}/terms_of_use` } render={ (props) => <TermsAndConditions { ...data } { ...props } /> } />

            <Route exact path='/' render={ () => <Homepage { ...data } /> } />
            <Route exact path='/inbox' render={ (props) => <ConversationIndexPage { ...data } { ...props } /> } />
            <Route exact path='/inbox/:id' render={ (props) => <ConversationPage { ...data } { ...props } /> } />
            <Route exact path='/messages/new' render={ (props) => <NewMessagePage { ...data } { ...props } /> } />
            <Route exact path='/search' render={ (props) => <SearchBar { ...data } { ...props } /> } />
            <Route exact path='/volunteers' render={ (props) => <SearchResults { ...data } { ...props } /> } />
            <Route exact path='/my_profile' render={ (props) => <MyProfile { ...data } { ...props } /> } />
            <Route exact path='/reviews/author/:url_slug' render={ (props) => <UserReviewIndexPage { ...data } { ...props } /> } />

            <Route
              exact
              path='/profiles/:url_slug'
              render={ (props) => (renderUserProfile (data, props)) }
            />
            <Route exact path='/password/new' component={ NewPasswordPage } />
            <Route exact path='/password/edit' render={ (props) => <ResetPasswordPage { ...props } /> } />
            <Route exact path='/availabilities/new' render={ (props) => <NewAvailability { ...data } { ...props } /> } />
            <Route exact path='/availabilities' render={ (props) => <AvailabilityIndexPage { ...data }  { ...props } /> } />

            <Route exact path='/about' render={ (props) => <AboutPage { ...data } { ...props } /> } />
            <Route exact path='/sign_in' component={ SignIn } />
            <Route exact path='/sign_up/:role' render={ (props) => <SignUp { ...data }  { ...props } /> } />
            <Route exact path='/terms_of_use' render={ (props) => <TermsAndConditions { ...data } { ...props } /> } />

            <Route path='/*' render={ () => <NotFoundPage { ...data } /> } />
          </Switch>
        </Router>

      </MuiThemeProvider>
    </IntlProvider>, container);
});
