import React from 'react';
import { connect } from 'react-redux';

import DeletePollButton from '../buttons/DeletePollButton';
import EditPollModal from '../modals/EditPollModal';
import { Options } from './styles/Item.styles';

interface IProps {
  user: IUser;
  poll: IPoll;
}

const PollItem: React.FC<IProps> = ({
  user,
  poll,
}) => {
  console.log(user);
  console.log(poll);

  const isOwner: boolean = user.id === poll.owner.id;

  const ownerOptions: JSX.Element = (
    <Options>
      <DeletePollButton poll={poll} />
      <EditPollModal />
    </Options>
  );

  return (
    <div>
      {isOwner && ownerOptions}
      {poll.name}
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PollItem);
