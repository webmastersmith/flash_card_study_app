import * as R from 'ramda'
const MSG = {
	EDIT_CARD: "EDIT_CARD",
	ADD_CARD: 'ADD_CARD',
	SAVE_CARD: 'SAVE_CARD'
}

export function createCard(cardData) {
	return {
		type: MSG.EDIT_CARD,
		cardData,
	}
}

// filter out match: R.filter(R.complement(R.propEq('id', id)))(model)

function update(msg, model) {
	switch (msg.type) {
		case MSG.EDIT_CARD: {
			const { cardData: { id, question, answer, score } } = msg
			return { ...model }
		}
		case MSG.ADD_CARD: {
			const { cardData: { id, question, answer, score } } = msg
			return { ...model }
		}
		case MSG.SAVE_CARD: {
			const { cardData: { id, question, answer, score } } = msg
			return { ...model }
		}
	}
	return model
}

export default update
