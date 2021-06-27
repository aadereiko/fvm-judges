import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from '../../contexts';
import { managementService } from '../../services/management';
import { nominationsService } from '../../services/nominations';
import { participantsService } from '../../services/participants';
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
    const fetchParticipant = async () => {
      const participant = await participantsService.loadParticipant(id);
      setParticipant(participant);
      setIsLoading(false);
    };
    fetchParticipant();
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

  // useEffect(() => {
  //   const loadAllMarks = async () => {
  //     const marks = await managementService.getBestMarks();
  //     console.log("Лучшие оценки", marks);
  //   };
  //   isAdmin && loadAllMarks();
  // }, []);

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
