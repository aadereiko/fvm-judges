import React, { useCallback, useEffect, useState } from 'react';
import { Management } from './Management';

import { managementService } from '../../services/management';
import { nominationsService } from '../../services/nominations';
import { participantsService } from '../../services/participants';

export const ManagementContainer = () => {
  const [users, setUsers] = useState([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isRemovingUser, setIsRemovingUser] = useState(false);
  const [nominations, setNominations] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const users = await managementService.getUsers();
      setUsers(users);
    };

    fetchData();
  }, [setUsers]);

  const handleCreate = useCallback(
    (userData) => {
      const createUser = async () => {
        setIsCreatingUser(true);
        await managementService.createJudge(userData);
        setIsCreatingUser(false);
      };

      createUser();
    },
    [setIsCreatingUser],
  );

  const handleDelete = useCallback(
    (id) => {
      const deleteUser = async () => {
        setIsRemovingUser(true);
        await managementService.removeJudge(id);
        setUsers(await managementService.getUsers());
        setIsRemovingUser(false);
      };

      deleteUser();
    },
    [setIsRemovingUser, setUsers],
  );

  useEffect(() => {
    const loadNominations = async () => {
      const nominations = await nominationsService.loadNominations();
      setNominations(nominations);
    };
    loadNominations();
  }, [setNominations]);

  useEffect(() => {
    const loadParticipants = async () => {
      const participants = await participantsService.loadParticipants();
      setParticipants(participants);
    };
    loadParticipants();
  }, [setParticipants]);

  useEffect(() => {
    let marks = {};
    users.forEach((user) => {
      const nominations = Object.keys(user.marks);
      nominations.forEach((nominationId) => {
        if (!marks[nominationId]) marks[nominationId] = {};
        const participants = Object.keys(user.marks[nominationId]);
        participants.forEach((participantId) => {
          if (!marks[nominationId][participantId])
            marks[nominationId][participantId] = { look: 0, idea: 0 };
          marks[nominationId][participantId].look += user.marks[nominationId][participantId].look;
          marks[nominationId][participantId].idea += user.marks[nominationId][participantId].idea;
        });
      });
    });
    console.log(marks);
    setMarks(marks);
  }, [users]);

  return (
    <Management
      users={users}
      onCreate={handleCreate}
      isCreatingUser={isCreatingUser}
      isRemovingUser={isRemovingUser}
      onDelete={handleDelete}
      nominations={nominations}
      participants={participants}
      marks={marks}
    />
  );
};
