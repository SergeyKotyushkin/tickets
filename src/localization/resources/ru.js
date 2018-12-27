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
      },
      alertModal: {
        errorLabel: 'Ошибка!',
        attentionLabel: 'Внимание!',
        closeButtonLabel: 'Закрыть'
      },
      confirmModal: {
        attentionLabel: 'Внимание!',
        yesButtonLabel: 'Да',
        noButtonLabel: 'Нет'
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
  },
  messages: {
    common: {
      internalServerError: 'Внутренняя ошибка на сервере!',
      unauthenticated: 'Действие неавторизованно!'
    },
    logIn: {
      someFieldsAreNotFilled: 'Не все поля заполнены!',
      wrongCredentials: 'Неправильные учетные данные!'
    },
    registration: {
      alreadyAuthenticated: 'Действие предполагает неавторизованное выполнение!',
      someFieldsAreNotFilled: 'Не все поля заполнены!',
      passwordsAreNotEqual: 'Введные пароли не совпадают!',
      existingUsername: 'Введенное имя пользователя уже использовано!',
      registrationIsComplete: 'Регистрация завершена!'
    },
    tickets: {
      addTicketConfirm: 'Добавить билет?',
      deleteTicketDateConfirm: 'Удалить дату билета?',
      deleteTicketConfirm: 'Удалить билет?',
      dateIsNotFilled: 'Поле дата не заполнено!',
      badData: 'Не все поля заполнены или переданы некорректные данные!'
    }
  }
}
