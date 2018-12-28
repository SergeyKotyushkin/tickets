module.exports = {
  auth: {
    logIn: '/login',
    logOut: '/logout',
    register: '/register',
    tryLogIn: '/try-login'
  },
  markup: {
    all: '*'
  },
  pages: {
    home: '/',
    logIn: '/login',
    tickets: '/tickets'
  },
  static: {
    prodJs: '*/dist/*.js',
    all: '*/dist'
  },
  tickets: {
    addTicket: '/add-ticket',
    deleteTicketDate: '/delete-ticket-date',
    deleteTicket: '/delete-ticket',
    findTicket: '/find-ticket',
    getTickets: '/get-tickets'
  }
};
