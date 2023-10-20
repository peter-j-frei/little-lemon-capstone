import React, { useState, useEffect } from 'react';
import { updateTimes } from './BookingPage';

function BookingForm({ availableTimes, dispatch }) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState("");
    const [occasion, setOccasion] = useState("");

    const [dateError, setDateError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [guestsError, setGuestsError] = useState("");
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (date) {
            const newAvailableTimes = updateTimes(date);
            dispatch({ type: 'UPDATE_TIMES', times: newAvailableTimes });
        }
    }, [date, dispatch]);

    useEffect(() => {
        if (date && time && guests > 0 && guests < 11) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [date, time, guests, occasion]);

    const validateDate = () => {
        if (!date) {
            setDateError("Please select a date.");
        } else {
            setDateError("");
        }
    };

    const validateTime = () => {
        if (!time) {
            setTimeError("Please select a time.");
        } else {
            setTimeError("");
        }
    };

    const validateGuests = () => {
        if (!guests) {
            setGuestsError("Please specify the number of guests.");
        } else if (guests < 1 || guests > 10) {
            setGuestsError("Number of guests should be between 1 and 10.");
        } else {
            setGuestsError("");
        }
    };
    
    return (
        <div className="reservation-container">
            <h2 className="subtitle">Book Now</h2>
            <form className="reservation-form">
                <label htmlFor="res-date" className="reservation-form label lead-text">Choose date</label>
                <input
                    type="date"
                    id="res-date"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                    onBlur={validateDate}
                    className="paragraph-text"
                />
                {dateError && <span className="reservation-form span special-section-title">{dateError}</span>}

                <label htmlFor="res-time" className="reservation-form label lead-text">Choose time</label>
                <select
                    id="res-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    onBlur={validateTime}
                    className="paragraph-text"
                >
                    <option value="">Select a time</option>
                    {availableTimes.map((timeOption) => (
                        <option key={timeOption} value={timeOption}>
                            {timeOption}
                        </option>
                    ))}
                </select>
                {timeError && <span className="reservation-form span special-section-title">{timeError}</span>}

                <label htmlFor="guests" className="reservation-form label lead-text">Number of guests</label>
                <input
                    type="number"
                    placeholder="Enter number of guests"
                    min="1"
                    max="10"
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    onBlur={validateGuests}
                    className="paragraph-text"
                />
                {guestsError && <span className="reservation-form span special-section-title">{guestsError}</span>}

                <label htmlFor="occasion" className="reservation-form label lead-text">Occasion</label>
                <select
                    id="occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="paragraph-text"
                >
                    <option value="">Select an occasion</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Casual">Casual</option>
                    <option value="Other">Other</option>
                </select>

                <input type="submit" value="Book Now!" disabled={!isValid} className="reservation-form input highlight-text" aria-label="On Click" />
            </form>
        </div>
    );
}

export default BookingForm;
