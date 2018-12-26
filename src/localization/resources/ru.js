export default {
  components: {
    app: {
      header: {
        title: 'Билеты',
        links: {
          home: 'Главная',
          logIn: 'Войти',
          logOut: 'Выйти',
          logOutDelimiter: '|'
        }
      },
      footer: {
        languagesTitle: 'Перевести сайт:'
      }
    },
    home: {
      welcomeText: 'Наконец-то у тебя появился способ следить за своими билетами!',
      logInPart1Text: 'Тебе необхотимо',
      logInLinkText: 'войти',
      logInPart2Text: 'чтобы начать!',
      loggedInPart1Text: 'Отлично! Исследование статистики твоих',
      loggedInTicketsLinkText: 'билетов',
      loggedInPart2Text: 'уже ждет тебя!'
    },
    login: {
      logIn: {
        title: 'Вход',
        usernameLabel: 'Имя',
        passwordLabel: 'Пароль',
        toRegistrationButtonLabel: 'К форме регистрации',
        logInButtonLabel: 'Войти'
      },
      loggedIn: {
        messagePart2: ', ты уже в системе!'
      },
      registration: {
        title: 'Регистрация',
        usernameLabel: 'Имя',
        passwordLabel: 'Пароль',
        conformPasswordLabel: 'Подтверждение пароля',
        toLogInButtonLabel: 'К форме входа',
        registerButtonLabel: 'Зарегистрироваться'
      }
    },
    tickets: {
      title: 'Билеты',
      loadMoreButtonLabel: 'Загрузить ещё',
      loadingMessage: 'Загрузка...',
      newTicket: {
        title: 'Добавление билета:',
        dateLabel: 'Дата:',
        addButtonLabel: 'Добавить'
      },
      searchTicket: {
        title: 'Поиск билета:',
        numberLabel: 'Номер билета:',
        findButtonLabel: 'Найти',
        notFoundMessage: 'Не найден'
      },
      ticketDetails: {
        title: 'Детали билета',
        deleteTicketButtonLabel: 'Удалить билет',
        deleteTicketDateButtonLabel: 'Удалить',
        datesTitle: 'Даты',
        closeTicketDetailsButtonLabel: 'Закрыть'
      },
      ticketNumber: {
        increaseDigitButtonLabel: '+',
        decreaseDigitButtonLabel: '-',
        increaseDigitButtonHoverMessage: 'Увеличить цифру номера билета',
        decreaseDigitButtonHoverMessage: 'Уменьшить цифру номера билета'
      },
      ticket: {
        headerLabel: '...',
        busLabel: 'автобус',
        ticketLabel: 'билет',
        priceLabel: '...',
        hoverMessage: 'Нажми на билет для просмотра его деталей'
      },
      ticketsList: {
        noTicketsMessage: 'Пока что у тебя нет ни одного билета!'
      },
      totalLabel: 'Всего:'
    }
  }
}
