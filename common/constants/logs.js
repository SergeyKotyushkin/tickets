module.exports = {
  logOut: {
    unauthenticated: 'logOut: user is not authenticated'
  },
  registration: {
    alreadyAuthenticated: 'registration: already authenticated with username',
    someFieldsAreNotFilled: 'registration: some fields are not filled',
    passwordsAreNotEqual: 'registration: passwords are no equal',
    existingUsername: 'registration: username has been already used',
    userCreationError: 'registration: an error has been occured on user creation',
    userSearchingError: 'registration: an error has been occured on user searching'
  },
  tickets: {
    addTicket: 'addTicket:',
    getTickets: 'getTickets:',
    deleteTicket: 'deleteTicket:',
    deleteTicketDate: 'deleteTicketDate:',
    findTicket: 'addTicket:',
    unauthenticated: 'user is not authenticated',
    internalServerError: 'internal server error'
  },
  tryLogIn: {
    unauthenticated: 'tryLogIn: user is not authenticated'
  }
}
