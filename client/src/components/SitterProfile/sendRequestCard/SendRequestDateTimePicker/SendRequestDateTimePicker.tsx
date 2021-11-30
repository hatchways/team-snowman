import { Box, InputAdornment, TextField, Select, MenuItem, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { useSitters } from '../../../../context/useSitterContext';
import DatePicker from 'react-multi-date-picker';
import { useRef, useState, useEffect, useCallback, ChangeEvent, ReactNode } from 'react';
import DateObject from 'react-date-object';
import { useRequest } from '../../../../context/useRequestContext';

interface availability {
  [id: string]: { start: DateObject; end: DateObject };
}

interface props {
  type: string;
}

export default function SendRequestDateTimePicker({ type }: props): JSX.Element {
  const classes = useStyles();
  const { requestADate, requestedStart } = useRequest();
  const { selectedSitter } = useSitters();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DatePickerRef = useRef<any | null>();
  const [availability, setAvailability] = useState<availability | null | undefined>(null);
  const [selectedDate, setSelectedDate] = useState<DateObject | null | undefined>(null);
  const [selectedTime, setSelectedTime] = useState<string | null | undefined>('');
  const [availabileTimes, setAvailableTimes] = useState<string[] | null | undefined>(null);

  const updateAvailableTimes = useCallback(() => {
    const times = [];
    let start = new DateObject();
    if (availability && selectedDate) {
      const weekDay = selectedDate.format('dddd');
      if (weekDay) {
        start = new DateObject(availability[weekDay]?.start);
        const end = new DateObject(availability[weekDay]?.end);
        if (type == 'end' && requestedStart) {
          const sameDay = new DateObject(requestedStart);
          if (sameDay.day === selectedDate?.day) {
            start.setHour(sameDay.hour + 1);
          }
        }
        while (start.valueOf() <= end.valueOf()) {
          times.push(start.format('h A'));
          start = new DateObject(start.add(1, 'h'));
        }
      }
    }
    setAvailableTimes(times);
  }, [availability, selectedDate, requestedStart, type]);

  const handleDateEntry = (Date: DateObject) => {
    setSelectedDate(Date);
    updateAvailableTimes();
  };

  const updateAvailability = useCallback(
    (sitterAvailability?: availability) => {
      sitterAvailability = {};
      if (selectedSitter) {
        for (let i = 0; i < selectedSitter?.availability?.length; i++) {
          const day = selectedSitter?.availability[i].day;
          const weekDay = new DateObject(day).format('dddd');
          sitterAvailability[weekDay] = {
            start: new DateObject(selectedSitter?.availability[i].start),
            end: new DateObject(selectedSitter?.availability[i].end),
          };
        }
      }
      setAvailability(sitterAvailability);
    },
    [selectedSitter],
  );
  const handleTimeSelect = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>, child: ReactNode) => {
    setSelectedTime(event.target.value as string);
    requestADate(selectedDate, event.target.value as string, type);
  };

  useEffect(() => {
    updateAvailability();
  }, [updateAvailability]);

  useEffect(() => {
    updateAvailableTimes();
  }, [updateAvailableTimes]);

  return (
    <Box display="flex" justifyContent="center">
      <Box className={classes.calendar} display="flex" justifyContent="center" marginBottom={3}>
        <DatePicker
          mapDays={({ date }) => {
            const weekDay = date.format('dddd');
            if (availability && !availability[weekDay])
              return {
                disabled: true,
              };
          }}
          multiple={false}
          minDate={type === 'end' && requestedStart ? new DateObject(requestedStart) : new DateObject()}
          value={selectedDate}
          className="red"
          ref={DatePickerRef}
          format="MMM D YYYY"
          onChange={handleDateEntry}
          render={
            <TextField
              variant="outlined"
              InputProps={{
                classes: {
                  input: classes.dateSelectText,
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => {
                        DatePickerRef?.current?.DatePickerRef?.current?.openCalendar();
                      }}
                    >
                      <DateRangeIcon className={classes.calendarIcon} />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Select
                      defaultValue={availabileTimes ? availabileTimes[0] : ''}
                      value={selectedTime}
                      onChange={handleTimeSelect}
                      className={classes.timeText}
                    >
                      <MenuItem disabled={true} value={'select'}>
                        Select a date
                      </MenuItem>

                      {availabileTimes?.map((time) => {
                        return (
                          <MenuItem value={time} key={time}>
                            {time}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </InputAdornment>
                ),
              }}
              onFocus={() => {
                DatePickerRef?.current?.openCalendar();
              }}
            ></TextField>
          }
        />
      </Box>
    </Box>
  );
}
