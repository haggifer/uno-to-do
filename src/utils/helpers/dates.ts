import moment, {Moment} from "moment/moment";

export interface IVerbalDate {
  date: Date,
  label?: string,
  accent?: 'warning' | 'danger',
}

export const getVerbalDate = (targetDate: Date): IVerbalDate => {
  const currentDate = new Date()

  let result: IVerbalDate = {
    date: targetDate,
  }

  if (targetDate.getTime() <= currentDate.getTime()) {
    result = {
      ...result,
      label: 'Expired',
      accent: 'danger',
    }
  } else if (targetDate.getDate() === currentDate.getDate()) {
    result = {
      ...result,
      label: 'Today',
    }
  } else if (
    targetDate.getDate() === currentDate.getDate() + 1 ||
    targetDate.getDate() === Number(moment(currentDate).add(1, 'day').format('DD'))
  ) {
    result = {
      ...result,
      label: 'Tomorrow',
    }
  } else {
    const isCurrentYear = targetDate.getFullYear() === currentDate.getFullYear()

    result = {
      ...result,
      label: moment(targetDate).format(isCurrentYear ? 'DD.MM' : 'DD.MM.YYYY'),
    }
  }

  return result
}

export const getUTCDueDateString = (date: Moment): string => {
  const clonedDate = moment(date)

  const offset = (new Date()).getTimezoneOffset() / 60

  clonedDate.subtract(offset, 'hours')

  return clonedDate.toISOString()
}

export const getLocalDueDateString = (date: Moment): string => {
  const clonedDate = moment(date)

  const offset = (new Date()).getTimezoneOffset() / 60

  clonedDate.add(offset, 'hours')

  clonedDate.hours(23).minutes(59).seconds(59)

  return clonedDate.toISOString()
}

export const getDateStringFromVerbal = (value: 'today' | 'tomorrow' | 'currentWeek'): string => {
  const targetDate = moment()
    .hour(23)
    .minutes(59)
    .seconds(59)

  switch (value) {
    case "today":
      return targetDate.toISOString()
    case "tomorrow":
      targetDate.add(1, 'day')
      return targetDate.toISOString()
    case "currentWeek":
      targetDate.day(7)
      return targetDate.toISOString()
    default:
      return targetDate.toISOString()
  }
}

export const getFormattedDate = (targetDate: Date): string => {
  return moment(targetDate).format('ddd, DD MMMM')
}