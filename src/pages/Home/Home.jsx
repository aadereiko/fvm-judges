import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { photoService } from '../../services/photo';
import {
  HomeWrapperElement,
  CardLeftElement,
  CardRightElement,
  CardsWrapperElement,
} from './elements';

export const Home = () => {
  const [lastMarkedPhoto, setLastMarkedPhoto] = useState(null);
  useEffect(() => {
    setLastMarkedPhoto(photoService.getLastMarkedPhoto());
  }, [setLastMarkedPhoto]);
  return (
    <HomeWrapperElement>
      <h4>Общее положение:</h4>
      <CardsWrapperElement>
        <CardLeftElement body>
          <p>
            Привет, мы очень рады, что ты решил нам помочь выбрать самые классные фотографии этого
            сезона! Будем ждать твои оценки до <b>15.00 среды (30.06)</b> ( так как вечером мы уже
            проводим награждение участников)
          </p>
          <p>
            Расскажу теперь немного о том, как проходил <b>ФотоВело в 2021.</b>
          </p>
          <p>
            В этом сезоне участники общались с нашим ботом, разгадывали загадки, чтобы получить
            карту до марафона, могли выбрать день участия и даже точки, которые хотят посетить:)
          </p>
          <p>
            <b>Механика проекта была такова:</b> для того, чтобы получить фотозадание (тему для
            фотографии) им надо было собрать три балла. На карте каждая точка стоила от 1 до 6
            баллов. То есть, чтобы открыть 8 фотозаданий, надо было набрать 24 балла. Если интересно
            - то можете изучить {`карту `}
            <a href="https://www.google.com/maps/d/edit?mid=1_VBoT7JUU0ZAL5omIAf6q884ipHk92Sh&ll=53.8803080599522%2C27.56817453955903&z=14">
              здесь
            </a>
            :)
          </p>
          <p>
            Также была одно дополнительное задание, для которых не нужных было ездить на специальные
            локации.
          </p>
          <p>
            Все темы прописаны на сайте, для оценивания мы используем 10-балльную систему (без
            десятичных значений) и оцениваем по двум критериям:
          </p>
          <ul>
            <li>
              <b>Идея</b> - это, то какой смысл участник хотел показатьс помощью фотографии. Так как
              участники в основном не проф. фотографы, то нам важнее,чтобы задумка и смысл, который
              был вложен в фотографию, тоже был оценен, и фотографию не судили по обложке
            </li>
            <li>
              <b> Исполнение</b> - тут оценивается, как человек подошел к реализации своей задумки,
              насколько он постарался, чтобы его идея была всем понятна.
            </li>
          </ul>
          <p>
            Дополнительное задание - это ФотоИстория. Участники должна были создать историю из 2-4
            кадров и дать ей название.
          </p>
          <p>Темы прописаны в подписях фотографий.</p>
          <p>
            И напомню, что по времени в среду уже награждение, поэтому в идеале получить ваши оценки
            до 15.00 среды.
            <br></br>
            <br></br>
            <b>Также будем рады видеть вас на награждении :)</b>
          </p>
          <p>
            Больше информации о проекте можно найти в наших постах в {`тг `}
            <a href="https://t.me/fotovelomarafon">канале</a>
          </p>
        </CardLeftElement>
        <CardRightElement>
          <Card.Header>Последняя оценка</Card.Header>
          {(lastMarkedPhoto &&
            lastMarkedPhoto.look &&
            lastMarkedPhoto.idea &&
            lastMarkedPhoto.participantId &&
            lastMarkedPhoto.nominationId &&
            lastMarkedPhoto.link && (
              <Card.Body>
                <img src={lastMarkedPhoto.link}></img>
                <Card.Text>
                  <div>
                    <b>Идея:</b>
                    {' ' + lastMarkedPhoto.idea}
                  </div>
                  <div>
                    <b>Реализация: </b>
                    {' ' + lastMarkedPhoto.look}
                  </div>
                  <div>
                    <Link
                      to={`/photos/${lastMarkedPhoto.nominationId}/${lastMarkedPhoto.participantId}`}
                    >
                      Перейти
                    </Link>
                  </div>
                </Card.Text>
              </Card.Body>
            )) || <span className="text-muted">Нет сведений</span>}
        </CardRightElement>
      </CardsWrapperElement>
      <Button as={Link} to="/nextPhoto" variant="dark">
        Начать оценивать
      </Button>
    </HomeWrapperElement>
  );
};
