import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const TicketForm = () => {
    const [ticket, update] = useState({
        description: '',
        emergency: false
    })

    const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem('honey_user')
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const ticketToSendToAPI = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ''
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceTickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
            navigate('/tickets')
        })
    }

    return (
        <form className='ticketForm'>
            <h2 className='ticketForm__title'>New Service Ticket</h2>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='description'>Description:</label>
                    <input 
                        required autoFocus
                        type='text'
                        className='form-control'
                        placeholder='Brief description of the problem'
                        value={ticket.description}
                        onChange={(event) => {
                            const copyState = {...ticket}
                            copyState.description = event.target.value
                            update(copyState)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input
                        type="checkbox"
                        value={ticket.emergency}
                        onChange={(event) => {
                            const copyState = {...ticket}
                            copyState.emergency = event.target.checked
                            update(copyState)
                        }}
                    />
                </div>
            </fieldset>
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}
