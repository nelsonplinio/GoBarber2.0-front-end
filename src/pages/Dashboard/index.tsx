import React, { useState, useCallback } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { FiPower, FiClock } from 'react-icons/fi';

import months from '../../utils/months';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  NextAppointment,
  Schedule,
  Section,
  Appointment,
  Calendar,
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={() => signOut()}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento à seguir</strong>
            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/14140891?s=460&u=2f0ca85fcc2a15ade2c28d0c5b179be2ccecfcca&v=4"
                alt="Nelson Plínio"
              />

              <strong>Nelson Plínio</strong>
              <span>
                <FiClock />
                09:00h
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manha</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/14140891?s=460&u=2f0ca85fcc2a15ade2c28d0c5b179be2ccecfcca&v=4"
                  alt="Nelson Plínio"
                />

                <strong>Nelson Plínio</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/14140891?s=460&u=2f0ca85fcc2a15ade2c28d0c5b179be2ccecfcca&v=4"
                  alt="Nelson Plínio"
                />

                <strong>Nelson Plínio</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/14140891?s=460&u=2f0ca85fcc2a15ade2c28d0c5b179be2ccecfcca&v=4"
                  alt="Nelson Plínio"
                />

                <strong>Nelson Plínio</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/14140891?s=460&u=2f0ca85fcc2a15ade2c28d0c5b179be2ccecfcca&v=4"
                  alt="Nelson Plínio"
                />

                <strong>Nelson Plínio</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/14140891?s=460&u=2f0ca85fcc2a15ade2c28d0c5b179be2ccecfcca&v=4"
                  alt="Nelson Plínio"
                />

                <strong>Nelson Plínio</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/14140891?s=460&u=2f0ca85fcc2a15ade2c28d0c5b179be2ccecfcca&v=4"
                  alt="Nelson Plínio"
                />

                <strong>Nelson Plínio</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={months}
            fromMonth={new Date()}
            selectedDays={selectedDate}
            disabledDays={{
              daysOfWeek: [0, 6],
            }}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDateChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
