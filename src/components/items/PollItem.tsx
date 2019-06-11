import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import polls from '../../store/polls';

import DeletePollButton from '../buttons/DeletePollButton';
import EditPollModal from '../modals/EditPollModal';
import { Checkbox, Tooltip, Progress } from 'antd';
import { Options, Subjects, Subject } from './styles/PollItem.styles';

interface IProps {
  user: IUser;
  poll: IPoll;
  votePoll: (payload: {
    id: string;
    subject: ISubject;
  }) => void;
}

const PollItem: React.FC<IProps> = ({
  user,
  poll,
  votePoll,
}) => {
  const [voters, setVoters] = useState<IUser[]>([]);

  useEffect(
    () => {
      const voters: IUser[] = poll.subjects.reduce(
        (acc: IUser[], cur: ISubject) => {
          return [
            ...acc,
            ...cur.voters,
          ];
        },
        [],
      );

      setVoters(voters);
    },
    [poll.subjects],
  );

  const isOwner: boolean = user.id === poll.owner.id;

  const ownerOptions: JSX.Element = (
    <Options>
      <DeletePollButton poll={poll} />
      <EditPollModal poll={poll} />
    </Options>
  );

  const subjects: JSX.Element[] = poll.subjects.map((subject) => {
    const votes: number = subject.voters.length;
    const isVoted: boolean = !!subject.voters.find(voter => voter.id === user.id);
    const handleVote: (e: React.MouseEvent) => void = e => votePoll({ subject, id: poll.id });

    return (
      <Subject key={subject.id}>
        <span className="subject-name">
          <Tooltip title={subject.name}>
            <Checkbox
              checked={isVoted}
              onClick={handleVote}
            >
              {subject.name}
            </Checkbox>
          </Tooltip>
        </span>
        <span className="subject-votes">{votes} Votos</span>
          <Progress
            className="subject-progress"
            percent={(votes / voters.length) * 100}
            showInfo={false}
            status="normal"
          />
      </Subject>
    );
  });

  return (
    <div>
      {isOwner && ownerOptions}
      <Subjects>
        {subjects}
      </Subjects>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

const mapDispatchToProps = {
  votePoll: polls.actions.votePoll,
};

export default connect(mapStateToProps, mapDispatchToProps)(PollItem);
