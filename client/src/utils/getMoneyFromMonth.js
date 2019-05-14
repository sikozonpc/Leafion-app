// Auxaliary method to extract type of money transaction from a given month
function getMoneyFromMonth(data, month, transactionType) {
	let totalGasto = 0;
	let totalRecebido = 0;

	if (transactionType === "r") {
		data.forEach((e) => {
			if (e.post.month === month && e.post.amount >= 0) {
				totalRecebido += Number(e.post.amount);
			}
			// Special argument for getting the total amount for the year
			else if (month === "all" && e.post.amount >= 0) {
				totalRecebido += Number(e.post.amount);
			}
		});

		return totalRecebido;
	} else {
		data.forEach((e) => {
			if (e.post.month === month && e.post.amount < 0) {
				totalGasto += Number(e.post.amount);
			} else if (month === "all" && e.post.amount < 0) {
				totalGasto += Number(e.post.amount);
			}
		});
		return -totalGasto;
	}
}

export default getMoneyFromMonth;
