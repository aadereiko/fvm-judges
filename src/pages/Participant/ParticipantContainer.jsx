import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from '../../contexts';
import { managementService } from '../../services/management';
import { nominationsService } from '../../services/nominations';
import { Participant } from './Participant';

export const ParticipantContainer = () => {
  const { user } = useAuthState();
  const isAdmin = user.role === 'admin';
  const { id } = useParams();
  const [participant, setParticipant] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [allJudgesMarks, setAllJudgesMarks] = useState(null);
  const [isMarksLoading, setIsMarksLoading] = useState(false);
  const [nominations, setNominations] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`/api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/participant/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setParticipant(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [setIsLoading]);

  useEffect(() => {
    const loadMarks = async () => {
      setIsMarksLoading(true);
      const marks = await managementService.getMarksOfParticipant(id);
      setAllJudgesMarks(marks);
      setIsMarksLoading(false);
    };
    isAdmin && loadMarks();
  }, [id, setIsMarksLoading, setAllJudgesMarks, isAdmin]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await managementService.getUsers();
      setUsers(users);
    };

    isAdmin && fetchUsers();
  }, [setUsers, isAdmin]);

  useEffect(() => {
    const loadNominations = async () => {
      const nominations = await nominationsService.loadNominations();
      setNominations(nominations);
    };
    loadNominations();
  }, [setNominations]);

  return (
    (participant && (
      <Participant
        id={id}
        participant={participant}
        isLoading={isLoading}
        marks={user.marks}
        withoutMarks={user.role === 'admin'}
        isAdmin={isAdmin}
        isAllJudgeMarksLoading={isMarksLoading}
        allJudgeMarks={allJudgesMarks}
        nominations={nominations}
        users={users}
      />
    )) ||
    null
  );
};
