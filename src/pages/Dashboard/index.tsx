import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { FiPower, FiClock, FiUser } from 'react-icons/fi';
import {
  isToday,
  isAfter,
  isBefore,
  format,
  parseISO,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import months from '../../utils/months';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  HeaderActionContent,
  Profile,
  Content,
  NextAppointment,
  Schedule,
  Section,
  Appointment,
  Calendar,
  EmptyText,
} from './styles';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface Appointment {
  id: string;
  date: string;
  user: User;
  passed: boolean;
  timeFormatted: string;
}

interface ScheduleDayPeriod {
  morning: Appointment[];
  afternoon: Appointment[];
  night?: Appointment[];
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback(
    (date: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleOnMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    async function loadMonthDaysAvailability(): Promise<void> {
      const month = currentMonth.getMonth() + 1;
      const year = currentMonth.getFullYear();

      const response = await api.get(
        `/providers/${user.id}/month-availability`,
        { params: { year, month } },
      );

      setMonthAvailability(response.data);
    }

    loadMonthDaysAvailability();
  }, [user.id, currentMonth]);

  useEffect(() => {
    async function loadProviderAppointments(): Promise<void> {
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      const response = await api.get<Appointment[]>('/appointments/me', {
        params: {
          day,
          month,
          year,
        },
      });

      const appointmentsWithFormat: Appointment[] = response.data.map(
        appointmentToFormat => {
          const dateParsed = parseISO(appointmentToFormat.date);
          const now = setMilliseconds(
            setMinutes(setSeconds(new Date(), 0), 0),
            0,
          );

          const isNow = now.getHours() === dateParsed.getHours();
          return {
            ...appointmentToFormat,
            passed: isBefore(dateParsed, now),
            timeFormatted: isNow
              ? 'Agora'
              : format(dateParsed, "HH:mm'h'", { locale: ptBR }),
          };
        },
      );

      setAppointments(appointmentsWithFormat);
    }

    loadProviderAppointments();
  }, [selectedDate]);

  const daysDisabledOfCurrentMonth = useMemo<Date[]>(() => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();

    return monthAvailability
      .filter(monthDay => !monthDay.available)
      .map(monthDay => new Date(year, month, monthDay.day));
  }, [currentMonth, monthAvailability]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => {
      const now = setMilliseconds(setMinutes(setSeconds(new Date(), 0), 0), 0);
      const dateParsed = parseISO(appointment.date);

      return isAfter(dateParsed, now);
    });
  }, [appointments]);

  const appointmentsInDayPeriod: ScheduleDayPeriod = useMemo<
    ScheduleDayPeriod
  >(() => {
    const morning = appointments.filter(
      appointment => parseISO(appointment.date).getHours() < 12,
    );

    const afternoon = appointments.filter(appointment => {
      const hour = parseISO(appointment.date).getHours();

      return hour >= 12 && hour < 18;
    });

    return {
      morning,
      afternoon,
    };
  }, [appointments]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const weekDayAsText = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

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

          <HeaderActionContent>
            <button type="button" onClick={() => signOut()}>
              <FiUser />
            </button>
            <button type="button" onClick={() => signOut()}>
              <FiPower />
            </button>
          </HeaderActionContent>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}

            <span>{selectedDateAsText}</span>
            <span>{weekDayAsText}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Atendimento à seguir</strong>
              <div>
                <img
                  src={
                    nextAppointment.user.avatar_url
                      ? nextAppointment.user.avatar_url
                      : `https://api.adorable.io/avatars/100/${nextAppointment.user.name}@adorable.png`
                  }
                  alt={nextAppointment.user.name}
                />

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.timeFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manha</strong>

            {(!appointmentsInDayPeriod ||
              appointmentsInDayPeriod.morning.length === 0) && (
              <EmptyText>Nenhum agendados neste período</EmptyText>
            )}

            {appointmentsInDayPeriod.morning.map((appointment: Appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.timeFormatted}
                </span>

                <div>
                  <img
                    src={
                      appointment.user.avatar_url
                        ? appointment.user.avatar_url
                        : `https://api.adorable.io/avatars/100/${appointment.user.name}@adorable.png`
                    }
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {(!appointmentsInDayPeriod ||
              appointmentsInDayPeriod.afternoon.length === 0) && (
              <EmptyText>Nenhum agendados neste período</EmptyText>
            )}

            {appointmentsInDayPeriod.afternoon.map(
              (appointment: Appointment) => (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock />
                    {appointment.timeFormatted}
                  </span>

                  <div>
                    <img
                      src={
                        appointment.user.avatar_url
                          ? appointment.user.avatar_url
                          : `https://api.adorable.io/avatars/100/${appointment.user.name}@adorable.png`
                      }
                      alt={appointment.user.name}
                    />

                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>
              ),
            )}
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={months}
            fromMonth={new Date()}
            selectedDays={selectedDate}
            disabledDays={[
              ...daysDisabledOfCurrentMonth,
              {
                daysOfWeek: [0, 6],
              },
            ]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDateChange}
            onMonthChange={handleOnMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
