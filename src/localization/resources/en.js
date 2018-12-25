export default {
  components: {
    app: {
      header: {
        title: 'Tickets',
        links: {
          home: 'Home',
          logIn: 'Log In',
          logOut: 'Log Out',
          logOutDelimiter: '|'
        }
      }
    },
    home: {
      welcomeText: 'Now you can store your bus tickets!',
      logInPart1Text: 'You need to',
      logInLinkText: 'log in',
      logInPart2Text: 'to start!',
      loggedInPart1Text: 'You are ready for your',
      loggedInTicketsLinkText: 'tickets',
      loggedInPart2Text: 'statistics!'
    },
    login: {
      logIn: {
        title: 'Log In',
        usernameLabel: 'Username',
        passwordLabel: 'Password',
        toRegistrationButtonLabel: 'To the Registration form',
        logInButtonLabel: 'Log In'
      },
      loggedIn: {
        messagePart2: ', you are already logged in!'
      },
      registration: {
        title: 'Registration',
        usernameLabel: 'Username',
        passwordLabel: 'Password',
        conformPasswordLabel: 'Confirm Password',
        toLogInButtonLabel: 'To the Log In form',
        registerButtonLabel: 'Register'
      }
    },
    tickets: {
      loadMoreButtonLabel: 'Load More',
      loadingMessage: 'Loading...',
      newTicket: {
        title: 'Add new ticket here:',
        dateLabel: 'Date:',
        addButtonLabel: 'Add'
      },
      searchTicket: {
        title: 'Search for a ticket:',
        numberLabel: 'Ticket number:',
        findButtonLabel: 'Find',
        notFoundMessage: 'Not Found'
      },
      ticketDetails: {
        title: 'Ticket details',
        deleteTicketButtonLabel: 'Delete ticket',
        deleteTicketDateButtonLabel: 'Delete',
        datesTitle: 'Dates',
        closeTicketDetailsButtonLabel: 'Close'
      },
      ticketNumber: {
        increaseDigitButtonLabel: '+',
        decreaseDigitButtonLabel: '-',
        increaseDigitButtonHoverMessage: 'Increase ticket number digit',
        decreaseDigitButtonHoverMessage: 'Decrease ticket number digit'
      },
      ticket: {
        headerLabel: '...',
        busLabel: 'bus',
        ticketLabel: 'ticket',
        priceLabel: '...',
        hoverMessage: 'Click to watch details of this ticket'
      },
      ticketsList: {
        noTicketsMessage: 'You don\'t have any ticket yet!'
      },
      totalLabel: 'Total:'
    }
  }
}
