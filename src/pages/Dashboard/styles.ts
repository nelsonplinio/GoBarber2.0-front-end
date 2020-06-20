import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 35px;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }
`;

export const HeaderActionContent = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  button {
    background: transparent;
    border: 0;

    & + button {
      margin-left: 16px;
    }

    svg {
      color: #999591;
      width: 24px;
      height: 24px;
      transition: color 0.4s;
      &:hover {
        color: #ff9000;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50px;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 25px;

    span {
      color: #f4efe8;
    }

    strong {
      color: #ff9000;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  margin-right: 120px;
`;

export const Schedule = styled.div`
  flex: 1;

  p {
    margin-top: 8px;
    color: #ff9000;
    font-weight: bold;
    span {
      position: relative;
      text-transform: capitalize;
    }

    span + span {
      margin-left: 16px;
    }

    span + span:before {
      content: '';
      position: absolute;
      background: #ff9000;
      width: 1px;
      height: 60%;
      left: -8px;
      bottom: calc(50% - 40%);
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    margin-top: 20px;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      background: #ff9000;
      width: 2px;
      height: 80%;
      top: calc(50% - 40%);
      left: 0;
    }

    img {
      height: 64px;
      width: 64px;
      border-radius: 50%;
    }

    strong {
      color: #fff;
      margin-left: 22px;
      font-size: 24px;
    }

    span {
      margin-left: auto;
      color: #999591;
      display: flex;
      align-items: center;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;

    border-bottom: 1px solid #3e3e3e;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  & + div {
    margin-top: 16px;
  }

  span {
    color: #f4edd8;
    display: flex;
    align-items: center;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    display: flex;
    align-items: center;
    margin-left: 16px;
    padding: 16px;
    background: #3e3b47;
    flex: 1;
    border-radius: 10px;
    position: relative;

    &:before {
      content: '';
      background: #ff9000;
      width: 1px;
      right: 0;
      top: calc(50%);
      position: absolute;
      min-height: 0;
      transition: all 0.4s;
    }

    &:hover:before {
      min-height: 70%;
      top: calc(50% - 35%);
    }

    img {
      height: 52px;
      width: 52px;
      border-radius: 50%;
    }

    strong {
      color: #fff;
      margin-left: 22px;
      font-size: 20px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 340px;
  margin-left: 30px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const EmptyText = styled.strong`
  color: #666360;
  font-size: 22px;
  border: 0 !important;
`;
