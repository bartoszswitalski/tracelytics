import { Flex, Spacer, Text } from '@chakra-ui/react';
import { CalendarState, SelectCalendarDayActionCreator } from '@tracelytics/frontend/application';
import { useInjection } from '@tracelytics/shared/di';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/plugin/isBetween';
import { useSubscriptionState } from '../../../generic';

type Props = {
    date: Dayjs;
};

export const DayTile = ({ date }: Props) => {
    const calendarState = useInjection<CalendarState>(CalendarState);
    const selectDayActionCreator = useInjection<SelectCalendarDayActionCreator>(SelectCalendarDayActionCreator);

    const selectedDateRange = useSubscriptionState(calendarState.selectedDateRange$, calendarState.selectedDateRange);
    const currentMonth = useSubscriptionState(calendarState.currentMonth$, calendarState.currentMonth);

    const isCurrentMonth = date.month() === currentMonth.month();
    const isToday = date.isSame(dayjs(), 'day');
    const isSelected =
        selectedDateRange.start &&
        selectedDateRange.end &&
        date.isBetween(selectedDateRange.start, selectedDateRange.end, 'day', '[]');

    const bgColor = isSelected ? 'tcs.500' : isToday ? 'tcs.100' : 'gray.50';
    const textColor = isSelected ? 'white' : isToday ? 'gray.800' : 'gray.800';

    return (
        <Flex
            px={7}
            py={2}
            rounded={'full'}
            alignItems={'center'}
            bgColor={bgColor}
            textColor={textColor}
            _hover={
                isSelected
                    ? {}
                    : {
                          bgColor: 'tcs.50',
                      }
            }
            cursor={'pointer'}
            onMouseDown={() => {
                selectDayActionCreator.create({ start: date, end: null });
            }}
            onMouseOver={() => {
                // console.log('mouse over', selectedDateRange.start, selectedDateRange.end);
                // if (selectedDateRange.start && !selectedDateRange.end) {
                //     selectDayActionCreator.create({ start: null, end: date });
                // }
            }}
            onMouseUp={() => {
                selectDayActionCreator.create({ start: null, end: date });
            }}
        >
            <Spacer />
            <Text fontWeight={'medium'} fontSize={'md'} opacity={isCurrentMonth ? 1 : 0.3} userSelect={'none'}>
                {date.format('D')}
            </Text>
            <Spacer />
        </Flex>
    );
};
