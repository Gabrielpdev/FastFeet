import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import Delivery from '~/pages/Deliveries/Delivery';

import Deliveryman from '~/pages/Deliveryman';
import AddDeliveryman from '~/pages/Deliveryman/Add';

import Recipients from '~/pages/Recipients';
import AddRecipient from '~/pages/Recipients/Add';

import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      {/* Deliveries */}
      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route
        path="/deliveries/delivery/"
        exact
        component={Delivery}
        isPrivate
      />
      <Route path="/deliveries/delivery/:id" component={Delivery} isPrivate />

      {/* Deliveryman */}
      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliveryman/add"
        exact
        component={AddDeliveryman}
        isPrivate
      />
      <Route path="/deliveryman/add/:id" component={AddDeliveryman} isPrivate />

      {/* Recipients */}
      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/recipients/add" exact component={AddRecipient} isPrivate />
      <Route path="/recipients/add/:id" component={AddRecipient} isPrivate />

      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
