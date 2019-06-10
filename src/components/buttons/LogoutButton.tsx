import React from 'react';
import { connect } from 'react-redux';

import auth from '../../store/auth';

import { Link } from 'react-router-dom';

interface IProps {
  logout: () => void;
}

const SubmitButton: React.FC<IProps> = ({
  logout,
}) => {
  return (
    <Link
      to="/login"
      onClick={logout}
    >
      Logout
    </Link>
  );
};

const mapDispatchToProps = {
  logout: auth.actions.logout,
};

export default connect(null, mapDispatchToProps)(SubmitButton);
