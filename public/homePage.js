"use strict"

const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(resp => {
	if(resp.success) {
		location.reload();
	}
});

ApiConnector.current(resp => {
	if(resp.success) {
		ProfileWidget.showProfile(resp.data);
	}
});

const ratesBoard = new RatesBoard();
function refreshStocks() {
	ApiConnector.getStocks(resp => {
		if(resp.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(resp.data);
		}
	});
};

refreshStocks();
setTimeout(refreshStocks, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, resp => {
    if(resp.success){
      ProfileWidget.showProfile(resp.data);
			moneyManager.setMessage(resp.success, `Пополнение счета выполнено успешно`);
    } else {
      moneyManager.setMessage(resp.success, resp.error);
    }
  })
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, resp => {
    if(resp.success){
      ProfileWidget.showProfile(resp.data);
			moneyManager.setMessage(resp.success, `Конвертирование валюты выполнено успешно`);
    } else {
      moneyManager.setMessage(resp.success, resp.error);
    }
  })
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, resp => {
    if(resp.success){
      ProfileWidget.showProfile(resp.data);
			moneyManager.setMessage(resp.success, `Перевод средств выполнен успешно`);
    } else {
      moneyManager.setMessage(resp.success, resp.error);
    }
  })
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(resp => {
	if(resp.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(resp.data);
		moneyManager.updateUsersList(resp.data);
	}
});

favoritesWidget.favoritesTableBody = () => {
	ApiConnector.getFavorites(resp => {
		if(resp.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(data);
			moneyManager.updateUsersList(data);
		}
	});
}

favoritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, resp => {

		if(resp.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(resp.data);
			moneyManager.updateUsersList(resp.data);
			favoritesWidget.setMessage(resp.success, `Пользователь успешно добавлен`);
		} else {
			favoritesWidget.setMessage(resp.success, resp.error);
		}
	});
}

favoritesWidget.removeUserCallback = (id) => {
	ApiConnector.removeUserFromFavorites(id, resp => {
		if(resp.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(resp.data);
			moneyManager.updateUsersList(resp.data);
			favoritesWidget.setMessage(resp.success, `Пользователь успешно удален`);
		} else {
			favoritesWidget.setMessage(resp.success, resp.error);
		}
	});
}
