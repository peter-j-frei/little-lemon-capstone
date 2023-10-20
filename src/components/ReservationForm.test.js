import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReservationForm from './ReservationForm';
import { initializeTimes, updateTimes } from './BookingPage';
import '@testing-library/jest-dom/extend-expect';


test('Renders the ReservationForm heading', () => {
    const mockAvailableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

    render(<ReservationForm availableTimes={mockAvailableTimes} />);

    const headingElement = screen.getByText("Book Now");
    expect(headingElement).toBeInTheDocument();
});

describe('BookingPage utility functions', () => {

    test('initializeTimes returns expected default times', () => {
        const expectedTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
        expect(initializeTimes()).toEqual(expectedTimes);
    });

    test('updateTimes returns the same times regardless of selected date', () => {
        const mondayDate = "2023-10-23";
        const expectedMondayTimes = ["17:00", "19:00", "21:00", "22:00"];
        const actualTimes = updateTimes(mondayDate);
        expect(actualTimes).toEqual(expectedMondayTimes);
    });

});

test('validateGuests gives error for out of range values', async () => {
    const { getByLabelText, getByText } = render(<ReservationForm availableTimes={[]} dispatch={jest.fn()} />);

    const guestsInput = getByLabelText('Number of guests');
    fireEvent.change(guestsInput, { target: { value: '15' } });
    fireEvent.blur(guestsInput);

    await waitFor(() => {
        expect(getByText('Number of guests should be between 1 and 10.')).toBeInTheDocument();
    });
});



test('it has correct input attributes', () => {
    const { getByLabelText } = render(<ReservationForm availableTimes={[]} dispatch={jest.fn()} />);

    const dateInput = getByLabelText("Choose date");
    expect(dateInput.type).toBe("date");

    const guestsInput = getByLabelText("Number of guests");
    expect(guestsInput.type).toBe("number");
    expect(guestsInput.min).toBe("1");
    expect(guestsInput.max).toBe("10");
});

test('it sets date error when date is not selected', () => {
    const { getByLabelText, getByText } = render(<ReservationForm availableTimes={[]} dispatch={jest.fn()} />);
    
    const dateInput = getByLabelText("Choose date");
    fireEvent.blur(dateInput);

    expect(getByText("Please select a date.")).toBeInTheDocument();
});

test('validateGuests accepts values in the range', async () => {
    const { getByLabelText, queryByText } = render(<ReservationForm availableTimes={[]} dispatch={jest.fn()} />);

    const guestsInput = getByLabelText('Number of guests');
    fireEvent.change(guestsInput, { target: { value: '5' } });
    fireEvent.blur(guestsInput);

    await waitFor(() => {
        expect(queryByText('Number of guests should be between 1 and 10.')).not.toBeInTheDocument();
    });
});

test('validateGuests gives error for values below 1', async () => {
    const { getByLabelText, getByText } = render(<ReservationForm availableTimes={[]} dispatch={jest.fn()} />);

    const guestsInput = getByLabelText('Number of guests');
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);

    await waitFor(() => {
        expect(getByText('Please specify the number of guests.')).toBeInTheDocument();
    });
});

test('validateGuests gives error for values above 10', async () => {
    const { getByLabelText, getByText } = render(<ReservationForm availableTimes={[]} dispatch={jest.fn()} />);

    const guestsInput = getByLabelText('Number of guests');
    fireEvent.change(guestsInput, { target: { value: '11' } });
    fireEvent.blur(guestsInput);

    await waitFor(() => {
        expect(getByText('Number of guests should be between 1 and 10.')).toBeInTheDocument();
    });
});
