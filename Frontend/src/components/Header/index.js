import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { MdExitToApp } from 'react-icons/md';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';
import { Container, Content, Badge, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <NavLink to="/deliveries">ENCOMENDAS</NavLink>
          <NavLink to="/deliveryman">ENTREGADORES</NavLink>
          <NavLink to="/recipients">DESTINATÁRIOS</NavLink>
          <NavLink to="/problems">PROBLEMAS</NavLink>
        </nav>

        <aside>
          <Profile>
            <div className="profile">
              <strong>{profile.name}</strong>

            </div>

            <div className="logout">
              <Badge onClick={handleSignOut}>
                <MdExitToApp size={20} />
              </Badge>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
