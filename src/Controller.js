import * as R from 'ramda'
const MSG = {
	ADD_CARD: 'ADD_CARD',
	EDIT_QUESTION: "EDIT_QUESTION",
	EDIT_ANSWER: "EDIT_ANSWER",
	SAVE_CARD: 'SAVE_CARD',
	CANCEL_CARD: 'CANCEL_CARD',
	SHOW_ANSWER: "SHOW_ANSWER",
}

export function addCard(card) {
	return {
		type: MSG.ADD_CARD,
		card,
	}
}
export function showAnswer(cardData) {
	return {
		type: MSG.SHOW_ANSWER,
		cardData,
	}
}

// filter out match: R.filter(R.complement(R.propEq('id', id)))(model)

function update(msg, model) {
	switch (msg.type) {
		case MSG.ADD_CARD: {
			const { card } = msg
			const { cards: oldCards, isAddButtonDisabled } = model
			const cards = [card, ...oldCards]
			console.log(cards)
			return { ...model, cards, isAddButtonDisabled: true }
		}
		case MSG.EDIT_QUESTION: {
			return { ...model }
		}
		case MSG.EDIT_ANSWER: {
			return { ...model }
		}
		case MSG.SAVE_CARD: {
			return { ...model }
		}
		case MSG.CANCEL_CARD: {
			return { ...model }
		}
		case MSG.SHOW_ANSWER: {
			return { ...model }
		}
	}
	return model
}

export default update
