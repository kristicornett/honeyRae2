import { useEffect, useState } from 'react'
import './Tickets.css'


export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFilteredTickets] = useState([])

    const localStorageUser = localStorage.getItem('honey_user')
    const honeyUserObject = JSON.parse(localStorageUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
            .then(response => response.json())
            .then((data) => {
                setTickets(data)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )
//purpose of use effect is to observe state
    useEffect(
        () => {
            if (honeyUserObject.staff){
                //employees
                setFilteredTickets(tickets)
            } else {
                //customers
                const myTickets = tickets.filter(ticket => ticket.userId == honeyUserObject.id)
                setFilteredTickets(myTickets)
            }
        }, [tickets]
    )


    return <>

    <h2>List of Tickets</h2>
    <div className="tickets">
        {
            filteredTickets.map((ticket) => {
                return <section key={ticket.id} className='ticket'>
                    <header>{ticket.description}</header>
                    <footer>Emergency:{ticket.emergency ? "🧨" : "No"}</footer>
                    <div>{ticket.dateCompleted}</div>
                </section>
               
            })
        }
    </div>
    
    </>
}

