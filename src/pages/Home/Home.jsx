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
            сезона!
          </p>
          <p>
            В этом сезоне участники общались с нашим ботом, разгадывали загадки, чтобы получить
            больше локаций на выбор, могли выбрать день участия и даже точки, которые хотят
            посетить:)
          </p>
          <p>Расскажу теперь немного о том, как проходил ФотоВело Choose your distance</p>
          <p>
            Механика проекта была такова: участники приезжали на нужную локацию ( на выбор из карты,
            которую мы им давали) и после того, как сбросили свою геопозицию боту - получали тему
            для фотографии.
          </p>
          <p>Таких точек было 8, следовательно и 8 тем для фотографий участники получили.</p>
          <p>
            Также было две дополнительные, для которых не нужных было ездить на специальные
            локации.Также было две дополнительные, для которых не нужных было ездить на специальные
            локации.
          </p>
          <p>
            Все темы прописаны в эксель файле, для оценивания мы используем{' '}
            <b>10-балльную систему</b> ( без десятичных значений) и оцениваем по двум критериям:
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
            Одна из дополнительных номинаций - это ФотоИстория. Участникам каждый день бот выдавал
            слово, и по итогу они сами могли сложить фразу - и сделать свою фотоисторию на эту тему.
          </p>
          <p>Темы прописаны в подписях фотографий.</p>
          <p>
            По времени мы бы хотелив среду уже провести награждение, поэтому в идеале получить твои
            оценки до 10 утра среды
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
